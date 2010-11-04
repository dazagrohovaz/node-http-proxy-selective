var vows = require('vows'),
    util = require('util'),
    assert = require('assert'),
    http = require('http');

var selectiveProxy = require('./../lib/node-http-proxy-selective');

vows.describe('trimslash').addBatch({
  'when double-slashed path given': {
    topic: function() {
      return selectiveProxy.__trimslash("/foo/");
    },
    'we get trimmed path': function(path) {
      assert.equal(path, "foo");
    }
  },
  'when non-slashed path given': {
    topic: function() {
      return selectiveProxy.__trimslash("foo");
    },
    'we get original path': function(path) {
      assert.equal(path, "foo");
    }
  }
}).run();

vows.describe('crateStatics').addBatch({
  'when options given': {
    topic: function() {
      var options = {
        filter: {
          "google.com": {
            "/style/css/": "css",
            "script/": "js"
          },
          "yahoo.co.jp:8000": {
            "/image": "img"
          }
        },
        basepath: "base/"
      };
      return selectiveProxy.__createStatics(options);
    },
    'we get three correct static servers': function(statics) {
      console.log(util.inspect(statics));
      assert.equal(statics["google.com"]["style/css"].root, "base/css");
      assert.equal(statics["google.com"]["script"].root, "base/js");
      assert.equal(statics["yahoo.co.jp:8000"]["image"].root, "base/img");
    }
  }
}).run();
