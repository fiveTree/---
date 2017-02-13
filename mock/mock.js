// 使用 Mock
var Mock = require('mockjs')
var Random = require('mockjs/src/mock/random');
var data = Mock.mock({
//  "banner|4": [{
//  	title:"@title",
//      src:Random.image('320x150', '#4A7BF7', '@str')
//      
//  }],
//  "proList|5-15": [{
//  	"goodsID|1-100": 100,
//      src:Random.image('100x100', '#4A7BF7', 'Hello')
//      
//  }]
	"proList|10":[{
		"goodsID|1-100":100,
		"goodsName":'@cparagraph(1, 3)',
		"goodsListImg":Random.image("100x100","#f66"),
		"price|50-300":300
	}]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))