const {parentPort} = require('worker_threads')
const catalog = require('./catalog.js')
function splitStr(str,rtnArr){
  let len =str.length
  if(len<1) return
  for(let i=0;i<len;){
  	rtnArr.push(str.substr(0,++i))
  }
  splitStr(str.substr(1),rtnArr)
}
function getKeyWord(str){
	if(!str.trim()) return ''
	let filterStr = str.replace('什么是',' ').replace('是什么',' ')
	let arr=[]
	let rtnArr = []
	let strArr=filterStr.split(' ')
	strArr.forEach(item=>{
		if(!item) return
		splitStr(item,arr)
	})
	let useless = ['的','了', '是', '呢', '吗']
	let setArr = [...new Set(arr)]
	setArr.forEach(item=>{
		if(!useless.includes(item)) rtnArr.push(item)
	})
	return rtnArr.sort((a,b)=>b.length-a.length)
}
function getContent(keywords,list){
	let hasArr = []
	let rtnObj = {}
	for(let key of keywords){
	    for(let item in list){
		    if(!item.toLowerCase().includes((key.toLowerCase()))) continue
		    let hasword = false
		    for(let has of hasArr){
		    	if(has!==key&&has.includes(key)){
		    		hasword=true
		    		break
		    	}
		    }
		    if(!hasword){
		    	hasArr.push(key)
		    	rtnObj[key]=rtnObj[key]||{}
		    	rtnObj[key][item]=list[item]
		    }
	    }
	}
	if(!hasArr.length) return ''
	return rtnObj
}
parentPort.on('message',(str)=>{
	// let str = event.data
	console.log('str：：：',str)
	setTimeout(()=>{
		let keywords = getKeyWord(str)
	    parentPort.postMessage(getContent(keywords,catalog))	
    },500)
})