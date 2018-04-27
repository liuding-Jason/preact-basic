/*
	intro : worklist components
	Author : chenchao
	Date : 2018-04-27
*/

import { h , Component } from "preact" ;
import "./index.css" ;
 
export default class Worklist extends Component {

	constructor(){
		super() ;
		this.state = {
		} ;
	}
	/*
		component did mount
	*/
	componentDidMount(){
	}

	render(){
		return (
			<div>
				<div className="t-disable-filter"></div>
				<div className="t-disable-types padding15"></div>
				<div className="t-disable-banner"></div>
				<div className="t-disable-worklist padding15">
					<div className="t-disable-work-item">
						
					</div>
				</div>
			</div>
		) ;
	}
}