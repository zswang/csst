'use strict';

/**
 * 处理 CSST 样式
 *
 * @param {string} id 元素 ID
 * @param {string} text 传送文本
 * @return {string} 返回样式内容
 */
function csst(id, text) {
  return `
  @keyframes ${id} {
    from {
    }
    to {
      color: red;
    }
  }
  @-webkit-keyframes ${id} {
    from {}
    to {
      color: red;
    }
  }
  #${id} {
    content: ${JSON.stringify(text)};
    animation: ${id} 2s;
    -webkit-animation: ${id} 2s;
  }`;
}

const http = require('http');
const url = require('url');

http.createServer(function(req, res) {
  console.log(req.url); // debug
  let location;
  try {
    location = url.parse(req.url, true);
  } catch (ex) {
    res.writeHead(503);
    res.end(ex.message);
    return;
  }

  switch (location.pathname) {
    case '/timestamp.css':
      // console.log(location);
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.end(csst(location.query.id, Date.now().toString()));
      break;
    default:
      res.writeHead(404);
      res.end('Not Found');
      break;
  }
}).listen('2016');