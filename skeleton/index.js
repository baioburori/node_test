/*
 * hello, world
 * IPなど設定：http://testcording.com/?p=1164
 */
/*
 * モジュール読み込み
 */
var http = require("http");
var fs = require("fs");
var socketio = require("socket.io");
var setting = require("./param.js");
var inspect = require("util").inspect;
var Common = require("./Common");
var common = new Common();

// console.log(util.inspect(cookies.Cookie));

// var parseCookie = require('connect').utils.parseJSONCookies;
// console.log(util.inspect(require('connect').utils));

/*
 * サーバの作成
 */
var server = http.createServer();

common.requestHandler(server, http);

var io = socketio.listen(server)


/*
 * 通信時の処理
 * クライアント側がio.connect()を実行すると、サーバの以下処理が実行される(イベント名：connection)
 */
io.sockets.on("connection", function (socket) {
	// socket.handshake.tmp = "Bye";
	// console.log("handshake:" + inspect(socket.handshake));
    // [message]イベント発信
	socket.send("誰かが接続しました。");


})
/*
 * イベント待受状態を開始する
 */
server.listen(setting.PORT, setting.IP, setting.startServer);
