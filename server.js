const Koa = require('koa')
const Router = require('koa-router')
const KoaStatic = require('koa-static')
const Path = require('path')
// 实例化
const app = new Koa()
const router = new Router()
const home = KoaStatic(Path.join(__dirname)+'/src/')

// 配置
app.use(home)
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 */
const port = process.env.PORT || 6060

app.listen(port,()=>{
	console.log(`server start on ${port}`)
})
// 路由匹配
