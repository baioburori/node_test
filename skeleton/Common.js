util = require("util");
url = require("url");

var Common = function(){
	var self = this;

	self.emitTimeout = function(socket, endTimeString, message){
		var now = new Date();
		var endTime = new Date(endTimeString);
		var timeout = endTime - now;
		socket.emit("setTimeout", {"timeout":timeout, "message":message});
	}

	this.getCookies = function(cookieString){
		var cookies = {};
		cookieString && cookieString.split(';').forEach(function( cookie ) {
    		var parts = cookie.split('=');
    		cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
		});
		return cookies;
	};

	/*
 	* requestイベント受信時の処理(イベントハンドラ)を作成する
 	*/
	this.requestHandler = function(server, http){

		server.on("request", function(req, res) {

  			


			// send request
			var reqTemplate = http.get("http://www.planetarium.konicaminolta.jp/", function(resTemplate) {
			// var reqTemplate = http.get("http://stepup.yahoo.co.jp/info.html", function(resTemplate) {
  				// console.log("url:" + util.inspect(req.url));
  				// output response body
  				// console.log(util.inspect(resTemplate.headers));
  				resTemplate.setEncoding('utf8');
  				resTemplate.on('data', function(str) {
					res.writeHead(200,  [['Content-Type', 'text/html']]);
					// res.end("test");
					res.end(str);
					console.log(str)
  				});
			});

			// error handler
			reqTemplate.on('error', function(err) {
  				res.writeHead(500);
				res.end("Server error : " + err);
			});
		});
	}
}
module.exports = Common;
