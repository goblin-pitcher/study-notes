function watch(data,expr,obj){
	this.data=data
	this.expr=expr
	this.value = this.get()
	if(typeof obj==='object'){
		this.cb=obj.handler
		if(obj.immediate){
			this.cb(this.value)
		}
	}else{
	    this.cb=obj
	}
}
watch.prototype.getVal=function(data,expr){
	let exprArr=expr.split('.')
	return exprArr.reduce((b,n)=>{return b[n]},data)
}
watch.prototype.get=function(){
	let val=this.getVal(this.data,this.expr)
	return val
}
watch.prototype.update=function(){
	let newVal = this.get()
	let oldVal = this.value
	if(newVal!==oldVal){
		this.cb(newVal,oldVal)
		this.value = newVal
	}
}