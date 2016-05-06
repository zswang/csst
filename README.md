CSST (CSS Text Transformation)
----------

## 背景

### 什么是 CSST？

一种用 CSS 跨域传输文本的方案。相比 JSONP 更为安全，不需要执行跨站脚本。

## 原理

通过读取 CSS3 content 属性获取传送内容。

### 调用流程

![image](https://cloud.githubusercontent.com/assets/536587/15070367/63126c30-13b6-11e6-93aa-75bf5995c019.png)

### 技术手段

* 怎么监听 `<link>` 加载完毕?

> 收集线上的资料，发现常见的方案是计时器或者用 onpropertychange、DOMAttrModified。

> 考虑是 CSS3 场景，取巧用动画开始 (`animationstart`) 这个事件来捕获。

### 服务器应答的内容

```js
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
```

## 问题

* 没有 JSONP 适配广，CSST 依赖支持 CSS3 的浏览器。

## 线上体验

<http://jhtmls.com/idea/csst.html>

## 参考资料

* [link element onload](http://stackoverflow.com/questions/2635814/javascript-capturing-load-event-on-link)
* [javascript: capturing load event on LINK](http://stackoverflow.com/questions/2635814/javascript-capturing-load-event-on-link)
