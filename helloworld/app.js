// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require("express");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 创建项目实例
var app = express();


// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "html");

// 定义icon图标
app.use(favicon(__dirname + '/favicon.ico'));

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));



//页面目录区域
app.get("/hello",function(req,res){
	res.send("hello world!");
});

app.get("/",function(req, res){
	res.render("index", {"title":"Hey", "message":"Hello there!"});
})

app.get("/photo",function(req, res){
	res.render("photo", {"title":"图片上传","name":"Vincen", "info":"资深前端开发工程师"});
})


app.get("/form",function(req, res){
    res.render("form", {"title":"表单页面"});
})

app.all("/login",function(req, res){
    var getData = req.body;

    res.render("login", {"title":"提交成功页面", "name":getData.name, "age":getData.age});

    req.on('data',function(data){
      console.log("服务器接收到的数据：" + decodeURIComponent(data));
    });
    req.on("end",function(data){
      console.log('客户端请求数据全部接收完毕');
    });
})


var server = app.listen(3000,function(){
	console.log("listening on port  %d", server.address().port);
});



// 404错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境，500错误处理
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();



// 输出模型app
module.exports = app;

