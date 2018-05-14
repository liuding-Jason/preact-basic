/*
	intro : http ajax request module
	Author : chenchao
	Date : 2018-05-07
*/

import axios from "axios" ;
import jsonp from "jsonp" ;
const MAXTIMEOUT = 5000 ;

// config defination
const host = '//app.58.com' ;
// const host= '//localhost:3001'
const curver = '8.3.1' ;

const jsonpHost = '//m.58.com'
/*
	intro : default options
*/
const getDefault = function(){
	return {
		// `url` is the server URL that will be used for the request
		url: '' ,

		// `method` is the request method to be used when making the request
		method: 'get' ,

		// `headers` are custom headers to be sent
		headers : {} ,

		// `params` are the URL parameters to be sent with the request
	  // Must be a plain object or a URLSearchParams object
	  params: {} ,

		// `data` is the data to be sent as the request body
	  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
	  // When no `transformRequest` is set, must be of one of the following types:
	  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
	  // - Browser only: FormData, File, Blob
	  // - Node only: Stream, Buffer
	  data: {} ,
	 
	  // `timeout` specifies the number of milliseconds before the request times out.
	  // If the request takes longer than `timeout`, the request will be aborted.
	  timeout: MAXTIMEOUT ,
	 
	  // `withCredentials` indicates whether or not cross-site Access-Control requests
	  // should be made using credentials
	  // withCredentials: false , // default

	  // `responseType` indicates the type of data that the server will respond with
	  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
	  responseType: 'json' , // default
	}
} ;
/*
	intro : auth data
*/
let authData = function(status , msg){
	switch(status){
		case 1 : 
		default :
			return true ;
	}
	return false ;
} ;
/*
	intro : ajax request
*/
const http = function(options){
	return new Promise((resolve , reject) => {
		let {
			url = '' ,
			// 请求前钩子
      interceptorRequest = data => data,
      // 请求后钩子
      interceptorResponse = data => data
		} = options ;
		Promise.resolve(interceptorRequest(options))
		.then((options) => {
			// ajax test time
			// console.time(url) ;
			axios(Object.assign({} , getDefault() , options , {url : host + url}))
			.then((res) => {
				// console.timeEnd(url) ;
				return interceptorResponse(res.data) ;
			})
			.then((res) => {
				let { msg = '' , status = 0 , result = {}} = res ;
				// TODO auth
				if(!authData(status , msg)) return ;
				resolve(result) ;
			})
			.catch((err) => {
				// console.timeEnd(url) ;
				console.log(JSON.stringify(err)) ;
			})
		})
	})
} ;
/*
	intro : get request
	@param - url - get url
	@param - params - url param
*/
export const get = function(url = '' , params = {}){
	return new Promise((resolve , reject) => {
		http({
			method : 'get' ,
			url ,
			params ,
		})
		.then((data) => {resolve(data)})
		.catch(e => {reject(e)}) ;
	})
} ; 
/*
	intro : post request
	@param - url - post url
	@param - params - url param
	@param - data - post body param
*/
export const post = function(url = '' , params = {} , data = {}){
	return http({
		method : 'post' ,
		params ,
		url ,
		data
	})
} ;
/*
	intro : jsonp request
	@param - url - jsonp request url , note url should start with '/' , like '/api/list/job?name=1'
*/
export const myjsonp = function(url = ''){
	return new Promise((resolve , reject) => {
		jsonp(`${jsonpHost}${url}`, null, (err, data) => {
	  	if(err){
	  		console.error(err.message) ;
	  		reject(err) ;
	  	}else{
	  		resolve(data) ;
	  	}
		}) ;
	}) ;
} ;




