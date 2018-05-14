/*
	intro : invoke a new page for web page in native app 
	Author : chenchao
	Date : 2018-05-09
	
	# API : invoke a new page ( 调用Native页面跳转相关功能 )
	
	# param : 
	tradeline	必填 String	业务线
	content 必填	Object	跳转页面相关配置项
		
	content说明：
	pagetype	必填 String	页面名称
	isfinish	非必填	Boolean	是否把当前页面从历史记录中移除。默认false
	needlogin	非必填	Boolean	是否前置登录：即打开下一页面之前需要提前登录，未登录则执行登录操作，登录失败或取消登录则不执行跳转。默认false
	ABMark	非必填	StringAB测使用，文档
	is_backtomain	✘	Boolean	在下一个页面点击返回按钮时，是否直接返回App首页。默认false, 仅iOS支持

	# simple use

	WBAPP.action.pagetrans('core',{
    pagetype:'common' ,
    url:'http://m.58.com' ,
    title:'58同城'
	}) ;

	WBAPP.action.pagetrans('house',{
    pagetype:'list' ,
    list_name:'' , // 房产的子业务名称
    cateid:'' , // 房产的子业务id
    local_name:'bj' , // 城市名称：bj
    title:'合租房' , // 标题
    meta_url:'http://apphouse.58.com/api/list' , // 数据接口
    ...args // 其他参数
	})
*/
import { auth , authAPI } from "./auth" ;

const pagetrans = function(tradeline , content = {}){
	// auth 
	if(!auth()) return ;
	if(!tradeline) return ;
	window.WBAPP.action.pagetrans(tradeline , content);
	console.log('WBAPP.action.pagetrans called success') ;
} ;

export default pagetrans ;