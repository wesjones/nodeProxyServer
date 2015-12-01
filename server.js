/**
 * NODEJS Server Definition
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	https = require('https'),
	server = http.createServer(app),
    httpProxy = require('http-proxy'),
	io = require('socket.io').listen(server);

var prefs = require('preferences');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.set('port', process.env.PORT || prefs.hostPort);
//app.use(express.logger());

// static
app.use(express.static(__dirname + prefs.dir.appHome));


/*
NODE PROXY
 */
var apiProxy = httpProxy.createProxyServer();

var url;
for(var i = 0; i < prefs.proxyUrls.length; i += 1) {
    url = prefs.proxyUrls[i];
    app.get(url, function (req, res) {
        apiProxy.web(req, res, {target: prefs.proxyHost});
    });
    app.post(url, function (req, res) {
        apiProxy.web(req, res, {target: prefs.proxyHost});
    });
    app.put(url, function (req, res) {
        apiProxy.web(req, res, {target: prefs.proxyHost});
    });
    app.delete(url, function (req, res) {
        apiProxy.web(req, res, {target: prefs.proxyHost});
    });
}

// http

server.listen(app.get('port'));

module.exports = app;