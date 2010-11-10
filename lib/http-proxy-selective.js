var util = require('util'),
    http = require('http'),
    URL = require('url'),
    httpProxy = require('http-proxy'),
    httpStatic = require('node-static'),
    colors = require('colors'),
    statics;


// public interface

exports.createServer = createServer;


// for test

exports.__trimslash = trimslash;
exports.__createStatics = createStatics;


// implementation

function handle(req, res) {
  var url = URL.parse(req.url),
      splat = removeFilename(url.pathname),
      staticServer;

  staticServer = (statics[url.host]) ? statics[url.host][trimslash(splat.dirname)] : null;

  if ( staticServer ) {
    req.url = splat.filename;

    staticServer.serve(req, res, function(err, result) {
      if (err) {
        util.error("Error serving " + staticServer.root + splat.filename + " - " + err.message);

        res.writeHead(err.status, err.headers);
        res.end();
      }
    });
    console.log("selective: ".yellow + "replaced " + url.href.red + " with local file: " + (staticServer.root + splat.filename).green);
  }
  else {
    proxy(req, res, url);
  }
}

function removeFilename(path) {
  var dirname = String(path).replace(/(\/\w+(?:\.\w+)+)$/, '');
  return { dirname: dirname, filename: RegExp.$1 };
}

function trimslash(path) {
  return String(path).replace(/^\/|\/$/g, '');
}

function proxy(req, res, url) {
  var proxy = new httpProxy.HttpProxy(req, res);
  proxy.proxyRequest(url.port || 80, url.hostname, req, res);
}

function chkoptions(options) {
  if ( typeof options !== "object" ) {
    console.log("option parameter is missing!");
    process.exit(1);
  }
  if ( ! options.filter || typeof options.filter !== "object" ) {
    console.log("filter is missing or not a object");
    process.exit(1);
  }
}

function createStatics(options) {
  var statics = {},
      basepath = trimslash(options.basepath || '.');

  for ( host in options.filter ) {
    statics[host] = {};
    for ( path in options.filter[host] ) {
      statics[host][trimslash(path)] = new httpStatic.Server(basepath + "/" + trimslash(options.filter[host][path]));
    }
  }
  return statics;
}

function createServer(options) {
  chkoptions(options);
  statics = createStatics(options);
  return http.createServer(handle);
}
