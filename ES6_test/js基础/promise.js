class _Promise{
    constructor(fn){
        this.funcArr = []
        this.statues = 'pending'
        this.data = null
        setTimeout(()=>{
            fn.call(this,this.resolve.bind(this),this.reject.bind(this))
        },0)
    }
    resolve(res){
        this.statues = 'fullfiled'
        this.value = res
        this.done()
    }
    reject(err){
        this.statues = 'reject'
        this.value = err
    }
    then(func){
        this.funcArr.push(func)
        if(func instanceof _Promise){
            return func
        }
        return this
    }
    done(){
        let arr = this.funcArr
        arr.forEach(item=>{
            if(typeof item === 'function'){
                this.value = item(this.value)
            }else{
                this.value = item
            }
        })
    }
}