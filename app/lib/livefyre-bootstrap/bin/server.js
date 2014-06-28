#!/usr/bin/env node

var express = require('express');
var lessMiddleware = require('less-middleware');
var portfinder = require('portfinder');
var pubDir = __dirname + '/..';
var lfBootstrapFonts = pubDir + '/src/fonts';

var app = express();

app.use(express.logger());

app.use(lessMiddleware({
    src: '/src/styles',
    dest: '/dist',
    compress: false,
    force: true,
    root: pubDir,
    paths: [pubDir]
}));

app.use('/', express.directory(pubDir));
app.use('/', express.static(pubDir));

portfinder.basePort = 8080;
portfinder.getPort(function (err, port) {
    if (err) throw err;
    app.listen(port, function () {
        console.log('livefyre-bootstrap/ listening on port: ' + port);
    });
});

process.on('SIGINT', function () {
    console.log('http-server stopped.'.red);
    process.exit();
});