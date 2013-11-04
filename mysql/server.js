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
var setting = require("./999_param.js");
var util = require("util");

/*
 * サーバの作成
 */
var server = http.createServer();

/*
 * requestイベント受信時の処理(イベントハンドラ)を作成する
 */
server.on("request", function(req, res) {
        // 外部のHTMLデータを読み込み
        fs.readFile(
                "./033_client.html",
                function (err, data) {
                        if (err) {
                                // とりあえずconsole.logでログを残す
                                // エラーが出たらnodeは死ぬのでendする
                                console.log(err);
                                res.writeHead(500);
                                res.end("Server error : " + err);
                        }

                        // HTTPレスポンスヘッダを作成・送信(200:OK,500:ServerError,404:NotFound)
                        res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
                        res.end(data);
                }
        );
});

// 参考URL
// http://programming-10000.hatenadiary.jp/entry/20130807/1375884093
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'test',
  user: 'root',
  password: ''
});

var query = connection.query('select * from tweet;', function (err, results) {
  console.log('--- results ---');
  console.log(util.inspect(results));
  // console.log('name is ...');
  // console.log(results[0].last_name);
});

connection.end(function() {
  console.log('connection end');
});

var io = socketio.listen(server)

/*
 * 通信時の処理
 * クライアント側がio.connect()を実行すると、サーバの以下処理が実行される(イベント名：connection)
 */
io.sockets.on("connection", function (socket) {

    // [message]イベント発信
	socket.send("誰かが接続しました。");
})
/*
 * イベント待受状態を開始する
 */
server.listen(setting.PORT, setting.IP, setting.startServer);
