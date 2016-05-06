CSST (CSS Text Transformation)
----------

## 背景

### 什么是 CSST？

一种用 CSS 跨域传输文本的方案。
相比 JSONP 更为安全，不需要执行跨站脚本。

## 原理

通过读取 CSS3 content 属性获取传送内容。

## 问题

* 没有 JSONP 适配广，CSST 依赖支持 CSS3 的浏览器。