/*
	intro : index page model
	Author : chenchao
	Date : 2018-05-14
*/

import {get , post , myjsonp} from "../../utils/http/http.js" ;

const API = "/api/list/job" ;

// mock data
let mockData = {
	listDataInfo : [
		{
			id : 1 ,
			name : "A"
		} ,
		{
			id : 2 ,
			name : "B"
		} ,
		{
			id : 3 ,
			name : "C"
		}
	]
}

export function getListData(params = {}){
	return new Promise((resolve , reject) => {
		// mock
		resolve(mockData) ;  return ;
		get(API , Object.assign({action : ""} , params))
		.then((data) => { resolve(data) })
		.catch(e => reject(e)) ;
	}) ;
}