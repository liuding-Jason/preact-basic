/*
	intro : double select component
	Author : chenchao
	Date : 2018-05-08
*/

import { h , Component } from "preact" ;
import "./index.css" ;
const SHOW_FLAG = "block" ;
const HIDE_FLAG = "none" ;

/*
	intro : to string function
*/
function toString(value = ''){
	return value + '' ;
}
export default class DoubleSelect extends Component {
	constructor(props){
		super(props) ;
		this.state = {
			second : {name : '全部' , id : '' , listname : ''} ,
			third : {name : '全部' , id : '' , listname : ''} 
		}
	}
	/*
		intro : click handler
	*/
	handleClick(){
		this.props.onChange() ;
	}
	/*
		intro : get value from item of list
	*/
	getValueFromItem(ev){
		ev.stopPropagation() ;
		// ev.nativeEvent.stopImmediatePropagation() ;
		ev.cancelBubble = true; 
		if(ev.target && ev.target.nodeName.toLowerCase() === "p"){
			let value = ev.target.getAttribute("data-value") ;
			return value ;
		}
		return false ;
	}
	/*
		intro : second type choose 
	*/
	secondTypesChoose(ev){
		//  组件容错处理，保证在组件显示时操作
		let value = this.props.visible === SHOW_FLAG && this.getValueFromItem(ev) ;
		if(!value || value === false) return ;
		// special handler
		if(value === 'all'){
			let options = {
				second : {
					listname : '' ,
					name : ''
				} ,
				third : {
					listname : '' ,
					name : ''
				}
			}
			this.setState({ second : options.second , third : options.third } , () => {
				this.props.onChange && this.props.onChange(options , "all") ;
			}) ;
			return ;
		}
		let {secondTypes = []} = this.props ;
		for(let i = 0 ; i < secondTypes.length ; i++){
			if(toString(value) === toString(secondTypes[i]['id'])){
				this.setState({second : secondTypes[i]}) ;
				break ;
			}
		}
	}
	/*
		intro : third types click
	*/
	thirdTypesChoose(ev){
		//  组件容错处理，保证在组件显示时操作
		let value = this.props.visible === SHOW_FLAG && this.getValueFromItem(ev) ;
		if(!value || value === false) return ;
		// special handler
		if(value === 'all'){
			let options = {
				second : Object.assign({} , this.state.second) ,
				third : Object.assign({} , this.state.second)
			} ;
			this.setState({third : {}} , () => {
				this.props.onChange && this.props.onChange(options) ;
			})
			return ;
		}
		let {second = {}} = this.state ;
		let {thirdTypes = []} = this.props ;
		// 兼容错误 
		// TODO 数据坑
		let name = second.listname || second.listName ;
		for(let i = 0 ; i < thirdTypes[name].length ; i++){
			if(toString(value) === toString(thirdTypes[name][i]['id'])){
				this.setState({third : thirdTypes[name][i]} , () => {
					// run change
					this.props.onChange && this.props.onChange(this.state)
				}) ;
				break ;
			}
		}
	}
	/*
		intro : second type render
	*/
	secondRender(){
		let {secondTypes = []} = this.props ;
		let {second = {}} = this.state ;
		return (
			<span>
				{
					secondTypes.map((item , index) => {
						let active = toString(second.id) === toString(item.id) ? "active" : "" ;
						let name = item.name || item.text ;
						// 数据清洗
						if(name !== "不限"){
							return <p
								key={item.id} 
								className={"t-select-item " + active}
								data-value={item.id}>{ item.name || item.text }</p>
						}
					})
				}	
			</span>
		) ;
	}
	/*
		intro : third types render
	*/
	thirdRender(){
		let {thirdTypes = {}} = this.props ;
		let {second = {} , third = {}} = this.state ;
		let listname = second.listName || second.listname ;
		return (
			<span>
				{
					thirdTypes[listname] && thirdTypes[listname].map((item , index) => {
						let active = toString(third.id) === toString(item.id) ? "active" : "" ;
						return <p
							key={index} 
							className={ "t-select-item " + active }
							data-name={ item.name }
							data-value={ item.id }>{ item.name }</p>
					})
				}
			</span>
		)
	}
	render(){
		let {wholename = "" , visible = HIDE_FLAG} = this.props ;
		let {second = {}} = this.state ;
		return (
			<div 
				className={ "t-full-screen t-double-screen " + visible } 
				onClick={ this.handleClick.bind(this) }>
				<div className="t-select-body t-select-body-after">
					<div 
					className="t-select-con t-select-con-href"
					onClick={ this.secondTypesChoose.bind(this) }>
						{
							wholename === "" ? "" : <p className="t-select-item" data-value="all">全 { wholename }</p>
						}
						{ this.secondRender() }
					</div>
					<div 
						className="t-select-con t-select-con-href right"
						onClick={ this.thirdTypesChoose.bind(this) }>
						{
							second.id && <p className="t-select-item" data-value="all">全 { second.name || '部' }</p>
						}
						{ this.thirdRender() }
					</div>
				</div>
			</div>
		)
	}
}