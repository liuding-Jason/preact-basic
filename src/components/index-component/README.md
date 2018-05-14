## Intro

`index-component` is a simple component for demo .

## Params

参数|说明|类型|默认值
-|-|-|-
data|组件渲染的数据|Object|无

## API
名称|说明|类型|默认值
-|-|-|-
onOk|确认事件|function|无

## Simple Use

```
import {h , Component} from "preact"
import Index from "/src/components/index-component/src/index"


export default class Index extends Component {
	
	constructor(){
		super() ;
		this.state = {
			localdata : [{
				id : 1 ,
				name : 'A'
			} , {
				id : 2 ,
				name : 'B'
			}]
		}
	}
	
	render(){
		return (
			<div>
				<Index data={this.state.localdata}></Index>
			</div>
		)
	}
}


```

## Tips

>	1、Make sure you know this tips .


