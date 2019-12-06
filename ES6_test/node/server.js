const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Worker} = require('worker_threads');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

app.all('*',function (req, res,next) {
  res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
//res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    	// res.setHeader('Content-Type','application/octet-stream')
    next();
})
app.get('/', function (req, res) {
  res.send('server page!');
});
app.post('/parsemsg', function (req, res) {
	let msg = req.body.msg
	console.log(req)
	res.send(msg)
	// let worker = new Worker('./filter.js')
	// worker.postMessage(msg)
	// worker.on('message',(str)=>{
	//    // let data=ev.data
 //       res.json(str||'未能检索到相关内容');
 //       worker.terminate()
	// })

});
app.listen(5555)