/*
	intro : Set burying pointer for web app throw this native api .
	Author : chenchao
	Date : 2018-05-09

	# API : Set burying point ( web通知native埋点 )
	
	# param :
	pageType	必填	String	页面类型，不能为空
	actionType	必填	String	埋点类型，不能为空
	opts	非必填	Object	opts 为Object对象数据，对象中可包含的字段为 params(参数) 及 cate
	
	# simple use :
 	WBAPP.action.setWeblog('detail', 'click', {
      params: ['1','ios','resd'],
      cate: 'core'
  })
*/
import { auth , authAPI } from "./auth.js" ;

let burylog = function(pageType, actionType, opts){
	// auth
	if(!auth()) return ;
	if(!pageType || !actionType) return ;

	window.WBAPP.action.setWeblog(pageType , actionType , opts) ;
	console.log(`setWeblog called ok and pageType=${pageType} actionType=${actionType}`) ;
} ;

export default burylog ;