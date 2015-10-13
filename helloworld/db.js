/** 
        先在项目中 安装 mysql模块
        npm install mysql;
        并执行代码中的数据库 表创建  和  数据插入语句（目的 添加测试数据）
**/
var express = require('express');
var client = require('mysql');
var app = express();

/** 数据库配置 **/
var settings = {
    host: 'localhost',
    user: 'root',
    password: 'admin',        //写你自己的密码
    database:'test',
    port: 3306
};

/** 取得数据库连接对象 **/
function getConnection( client, settings ){
        return client.createConnection( settings );
}

/** 连接数据库 **/
function connectFun( conn ){
        conn.connect(function(error, results) {
          if(error) {
                console.log('Connection Error: ' + error.message);
                return;
          }
          console.log('Connected to MySQL');
        });
}

/** 数据库操作 **/
function execQuery( sql, conn, successFun, errFun ){
        conn.query( sql, function(err, rows, fields) {
                if (err) throw err;
                if( rows.constructor === Array ) {        //查询操作
                        if( !!rows.length ) {
                                successFun();
                        } else {
                                errFun();
                        }
                } else {        //增删改 操作
                        if( rows.affectedRows === 1 ) {
                                successFun();
                        } else {
                                errFun();
                        }
                }
        });
}

var exports = {
        client: client,
        settings: settings,
        getConnection: getConnection,
        connectDB: connectFun,
        execQuery: execQuery
};

module.exports = exports;

/**
CREATE TABLE `NodeSample` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `firstname` VARCHAR( 20 ) NOT NULL ,
  `lastname` VARCHAR( 20 ) NOT NULL ,
  `message` TEXT NOT NULL
);

insert into NodeSample (id, firstname, lastname, message) values(null, 'Tom', 'Wang', 'This is a Node Test By Wang!');

update NodeSample set firstname = 'Toms' where id = 2;

delete from NodeSample where id = 2;

**/