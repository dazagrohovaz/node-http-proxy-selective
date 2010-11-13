# node-http-proxy-selective - v0.1.2

## node.js proxy also serves local files instead of remote ones

### Features

- reverse-proxies incoming requests and serve static files on specific path
- can be used as a CommonJS module in node.js
- written entirely in javascript

### When to use node-http-proxy-selective

When you want to replace some remote files ( html, css, javascript, etc... ) with your local files. You can use node-http-proxy-selective as proxy server of your browser.
You can try your updated files without deploying to the producting environment. It is also useful when you want to test your files but you do not have
the permission to upload them to the servers.

### Installing npm (node package manager)
<pre>
  curl http://npmjs.org/install.sh | sh
</pre>

### Installing node-http-proxy-selective
<pre>
  npm install http-proxy-selective
</pre>

### How to setup a basic selective proxy server
<pre>
  var selective = require('http-proxy-selective');

  selective.createServer({
    filter: {
      "yahoo.co.jp": {
        style: "css"
      }
    },
    basepath: "mystyles" // you can omit this param with using '.' as default
  }).listen(8080);
</pre>

Then you can use this server as proxy of your browser to replace some files on remote server with local files.
With this example setting, your browser get ./mystyles/css/[filename] instead of http://yahoo.co.jp/style/[filename].

### License

(The MIT License)

Copyright (c) 2010 Naosuke Yokoe

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: http://nodejitsu.com
