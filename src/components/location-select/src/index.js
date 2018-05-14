/*
	Intro : Location Component
	Author : chenchao 
	Date : 2018-04-25
*/

import { h , Component } from 'preact' ;
import "./index.css" ;

const SHOW_FLAG = "block" ;
export default class Location extends Component {
	constructor(props){
		super(props) ;
		this.state = {
			visible : 'none' ,
			info : {
				city : {
					id : "" ,
					listname : "" ,
					name : ""
				} ,
				area : {
					id : "" ,
					listname : "" ,
					name : ""
				}
			}
		} ;
	}
	componentDidMount(){
	}
	/*
	 handleClick
	*/
	handleClick(ev){
		this.props.onChange() ;
	}
	getIndexFromItem(ev){
		ev.stopPropagation() ;
		// ev.nativeEvent.stopImmediatePropagation() ;
		ev.cancelBubble = true; 
		if(ev.target && ev.target.nodeName.toLowerCase() === "p"){
			let index = ev.target.getAttribute("data-index") ;
			return index ;
		}
		return false ;
	}
	/*
	 intro : city choose 
	*/
	handleChooseCity(ev){
		// * 组件容错处理，保证在组件显示时操作
		// TODO index 处理方式不太好
		let index = this.props.visible === SHOW_FLAG && this.getIndexFromItem(ev) ;
		if(!index || index === false) return ;
		let { dataOrigin = {} } = this.props ;
		let {datastr = []} = dataOrigin ;
		let { city } = datastr[0] || {} ;
		if(city){
			this.setState({
				info : Object.assign({area : {}} , {city : datastr[0][city][index]} || {})
			}) ;
		}
	}
	/*
		intro : choose area
	*/
	handleChooseArea(ev){
		let index = this.props.visible === SHOW_FLAG && this.getIndexFromItem(ev) ;
		if(!index || index === false) return ;
		let { dataOrigin = {} } = this.props ;
		let {datastr = []} = dataOrigin ;
		// 容错
		if(datastr && datastr[0]){
			let info = Object.assign({} , this.state.info , {area : {}}) ;
			info.area = Object.assign({} , datastr[0][this.state.info.city.listname][index] || {}) ;
			this.setState({
				info : info
			} , () => {
				// 传递选择的值 给父组件
				this.props.onChange(info) ;
			}) ;
		}
	}
	/*
		intro : render concent
	*/
	render(){
		let { dataOrigin = {} , provinceName = "北京"} = this.props ;
		let	{datastr = []} = dataOrigin ;
		let { city } = datastr[0] || {} ;
		return (
			<div 
				className={ "t-full-screen t-full-screen-bg " + this.props.visible } 
				onClick={ this.handleClick.bind(this) }>
				<div className="t-select-body t-select-body-after">
					<div 
					className="t-select-con t-select-con-href"
					onClick={ this.handleChooseCity.bind(this) }>
						<p className="t-select-item">全 { provinceName }</p>
						{
							datastr[0] && datastr[0][city] && datastr[0][city].map((item , index) => {
								let active = this.state.info.city.id * 1 === item.id * 1 ? "active" : "" ;
								return <p
									key={index} 
									className={"t-select-item " + active }
									data-index={index}>{ item.name }</p>
							})
						}
					</div>
					<div 
						className="t-select-con t-select-con-href right"
						onClick={ this.handleChooseArea.bind(this) }>
						{
							this.state.info.city.name && <p className="t-select-item">全 { this.state.info.city.name }</p>
						}
						{
							this.state.info.city.listname && datastr[0][this.state.info.city.listname].map((item , index) => {
								let active = this.state.info.area.id * 1 === item.id * 1 ? "active" : "" ;
								return <p
									key={index} 
									className={ "t-select-item " + active }
									data-index={index}>{ item.name }</p>
							})
						}
					</div>
				</div>
			</div>
		) ;
	}
}