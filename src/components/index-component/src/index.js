/*
	intro : index component
	Author : chenchao
	Date : 2018-05-14
*/

import {h , Component} from "preact" 
import "./index.css"

export default class Index extends Component {
	constructor(props){
		super(props);
	}
	render(){
		let {data = []} = this.props ;
		return (
			<div>
			{
				data.map((item , index) => {
					return <div className="t-index-line flex"><span className="t-index-num flex1">{item.id}</span><span className="t-index-font flex1">{item.name}</span></div>
				})
			}
			</div>
		)
	}
}