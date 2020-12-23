//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const yargs = require('yargs');

const { argv } = yargs
    .option('dev', {
        description: 'enable dev mode or prod',
        type: 'boolean',
        default: false
    })

// set up server
var app = express();
app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');
const options = {};

var PORT;
var compiler;

if (argv.dev) {
    PORT = 3000;
    compiler = webpack(devConfig);
} else {
    PORT = 80;
    compiler = webpack(prodConfig);
}

const server = new http.Server(app);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});
app.use(middleware(compiler, options));
app.use(require('webpack-hot-middleware')(compiler));

// normal routes with POST/GET 
app.get('*', (req, res, next) => {
    var filename = path.join(compiler.outputPath,'index');
    
    compiler.outputFileSystem.readFile(filename, async (err, data) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(data);
        res.end();
    });
});

// on terminating the process
process.on('SIGINT', _ => {
    console.log('quitting!');
    process.exit();
})