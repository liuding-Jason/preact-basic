/*
	intro : single select component
	Author : chenchao
	Date : 2018-05-07
	
	props params 
	
	value 选中的itemvalue值 
	visible 是否可见 none - 隐藏 block - 显示
	data 数据源 [{text : '1' , value : '1'}] ;
	onChange 获取选中值 function

	返回 选中item
*/
import { h , Component } from "preact" ;
import PropTypes from 'prop-types';
import "./index.css" ;

const SHOW_FLAG = 'block' ;

class SingleSelect extends Component {
	constructor(props){
		super(props) ;
		this.state = {
			value : ''
		}
	}
	componentDidMount(){
		this.setState({
			value : this.props.value
		});
	}
	/*
		intro : to string
	*/
	toString(key = ''){
		return key + '' ;
	}

	handleClick(){
		this.props.visible === SHOW_FLAG && this.props.onChange() ;
	}
	getValueFromItem(ev){
		ev.stopPropagation() ;
		ev.cancelBubble = true; 
		// ev.nativeEvent.stopImmediatePropagation() ;
		if(ev.target && ev.target.nodeName.toLowerCase() === "p"){
			let value = ev.target.getAttribute("data-value") ;
			return value ;
		}
		return false ;
	}
	/*
		intro : choose item click handle
		@param - ev - event object
	*/
	handleChooseItem(ev){
		let value = this.props.visible === SHOW_FLAG && this.getValueFromItem(ev) ;
		if(!value || value === false) return ;
		this.setState({
			value : value
		} , () => {
			// 优化体验
			for(let i = 0 ; i < this.props.data.length ; i++){
				if(this.toString(value)  === this.toString(this.props.data[i]['value'])){
					this.props.onChange && this.props.onChange( this.props.data[i] ) ;
					break ; 
				}
			}
		}) ;
	}
	render(){
		let {visible = 'none' , data = []} = this.props ;
		return (
			<div 
				className={ "t-full-screen t-single-screen " + visible } 
				onClick={ this.handleClick.bind(this) }>
				<div className="t-select-body">
					<div 
						className="t-select-con"
						onClick={ this.handleChooseItem.bind(this) }>
						{	
							data.map((item , index) => {
								let active = this.toString(this.state.value) === this.toString(item.value) ? "active" : "" ;
								return <p
									key={ index }
									data-value={ item.value } 
									className={ "t-select-item " + active } >{ item.text }</p>
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

/*
	intro : props validate useless
*/ 
SingleSelect.propTypes = {
	data : PropTypes.array ,
	visible: PropTypes.oneOf(['block', 'none']) ,
	onChange : PropTypes.func
} ;

export default  SingleSelect ;