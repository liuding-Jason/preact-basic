/*
	intro : Auth whether your web app has loaded  hybrid APIS . 
	Author : chenchao
	Date : 2018-05-09
	
	# tips :
	For detail , see < http://apptest.58.com/static/test/app/new_hybird_frame/docs/>
	If not , load <http://apptest.58.com/static/js/js-sdk/dev/app.js>
*/
const HAS_LOADED = true ;
const HAS_NOT_LOADED = false ;

const authWBAPP = function (){
	// WBAPP
	if(!window.WBAPP || typeof window.WBAPP !== 'object'){
		throw new Error("you may not load hybrid , for detail see < http://apptest.58.com/static/test/app/new_hybird_frame/docs/>") ;
	}
}

/*
	intro : Auth WBAPP API
*/
export const authAPI = function(API = ''){
	try{
		authWBAPP() ;
	}
	catch(err){
		console.log(err) ;
	}
}
/*
	intro : Auth WBAPP
*/
export const auth = function(){
	try {
		authWBAPP() ;
		return true ;
	}catch(err){
		console.log(err) ;
		return false ;
	}
}

