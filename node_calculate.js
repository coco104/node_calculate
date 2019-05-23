//引入http模块
var http = require('http');

var url = require('url');

var querystring = require('querystring');

//创建一个web服务器实例
var server = http.createServer(function(req,res){
	//设置发送头信息
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	var postData = "";
	 //每当接收到请求体数据，累加到post中
	req.on('data' , function(chunk){
		postData += chunk;
	});
	req.on('end' , function(){
		var result = "";
		var get=url.parse(req.url,true).query;//将url返回对象属性
		var post = querystring.parse(postData);
		res.write('<form method="post" action="?act=calculate" >');
		res.write('请输入：<input name="result" type="text" value="'+result+'"/>');
		res.write('<input type="submit" value="计算"/></form>');
		if (get.act == "calculate"){
			result = post.result;
			res.write(result+"="+eval(result));
		}
		res.end();
	});
});
server.listen(3000);