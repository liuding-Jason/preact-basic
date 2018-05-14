/*
	intro : index pages
	Author : liuding
	Date : 2018-05-14
*/
import {h , Component} from "preact" ;
import Index from "../../components/index-component/src/index" 
import {getListData} from "../../model/index/index" ;

// style
import "./index.css"

export default class IndexPage extends Component {
	constructor(){
		super() ;
		this.state = {
			listData : []
		}
	}
	componentDidMount(){
		// init
		this.init() ;
	}
	init(){
		this.getAjaxData() ;
	}
	/*
		intro : get data
	*/
	getAjaxData(query){
		query = Object.assign({
			// default param
		} , query);
		getListData(query)
		.then((res) => {
			let {listDataInfo = []} = res ;
			this.setState({
				listData : listDataInfo
			});
		})
		.catch(e => console.log(e)) 
	}
	render(){
		return (
			<div className="t-index-con">
				<h2 className="t-index-main-title">Preact Demo Basic</h2>
				<Index data={this.state.listData}></Index>
			</div>
		)
	}
} 