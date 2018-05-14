/*
	intro : loading component
	Author : chenchao
	Date : 2018-05-10

	loading : block - show none - hide
	theme: dark - black light - white
*/

import { h , Component } from 'preact' ;
import "./index.css" ;
export default class Loading extends Component {
	constructor(props){
		super(props) ;
	}
	render(){
		let {loading = 'block' , theme = 'light'} = this.props ;
		return (
			<div className={ "t-full-screen t-g-load " + loading + ' ' + theme} >
				<div className={"t-g-load-con " + theme}>
					<svg class="t-g-load-circular" viewBox="25 25 50 50">
			      <circle class="t-g-load-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			    </svg>
				</div>
			</div>
		)
	}

}