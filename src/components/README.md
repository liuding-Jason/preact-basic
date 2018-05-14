
# location-select component

## API

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
provinceName | 当前省份名称 | String | "北京"  
dataOrigin | 城市数据源 | Object | {}
visible | 是否显示城市选取组件（ none - 隐藏 block - 显示 ） | String | none 
onChange | 点选城市之后的 回调函数 | Function  | function 

## 方法

| 名称 | 描述 |
| --- | --- |
| onChange() | select 改变回调函数  |

## tips 

1、返回数据类型

```
	{
		city : {
			id : "1142" ,
			listname : "chaoyang" ,
			name : "朝阳"
		} ,
		area : {
			id : "11425" ,
			listname : "wangjing" ,
			name : "望京"
		}
	}
```