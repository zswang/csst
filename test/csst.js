var csst = require("../");require("./lib/dom");

describe("src/csst.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("csst():base", function (done) {
    examplejs_printLines = [];
    csst('http://localhost:2016/text.css?text=hello', function(err, text) {
      examplejs_print(err);
      assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];

      examplejs_print(text);
      assert.equal(examplejs_printLines.join("\n"), "hello"); examplejs_printLines = [];
      done();
    });
  });
          
  it("csst():base2", function (done) {
    examplejs_printLines = [];
    csst('http://localhost:2016/text.css?text=world', function(err, text) {
      examplejs_print(err);
      assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];

      examplejs_print(text);
      assert.equal(examplejs_printLines.join("\n"), "world"); examplejs_printLines = [];
      done();
    });
  });
          
});
         