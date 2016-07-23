'use strict';

const url = require('url');
var document;

/**
 * 模拟 DOM
 */
class EventTarget {
  constructor() {
    this._listeners = [];
  }

  addEventListener(eventName, handler) {
    if (typeof handler === 'function') {
      this._listeners.push([eventName, handler]);
    }
  }

  dispatchEvent(eventName) {
    var eventData = {
      name: eventName
    };
    var self = this;
    this._listeners.forEach(function(item) {
      if (item[0] === eventName) {
        item[1].call(self, eventData);
      }
    });
  }
}

class Node extends EventTarget {
  constructor(nodeName) {
    super();
    this._nodeName = nodeName;
    this._childNodes = [];
  }

  appendChild(node) {
    node.parentNode = this;
    this._childNodes.push(node);
  }

  removeChild(node) {
    this._childNodes = this._childNodes.filter(function(item) {
      return item !== node;
    });;
  }

  get childNodes() {
    return this._childNodes;
  }
}

class HTMLElement extends Node {
  constructor(tagName) {
    super(tagName);
    this._tagName = tagName;
    this._style = {};
    this._id = undefined;
  }
  get style() {
    return this._style;
  }
  set id(value) {
    this._id = value;
  }
  get id() {
    return this._id;
  }
}

class HTMLHtmlElement extends HTMLElement {
  constructor() {
    super('html');
  }
}

class HTMLHeadElement extends HTMLElement {
  constructor() {
    super('head');
  }
}

class HTMLLinkElement extends HTMLElement {
  constructor() {
    super('link');
  }
  set href(value) {
    this._href = value;
    let location = url.parse(value, true);
    var element = document.getElementById(location.query.id);
    element.computedStyle = {
      content: new Buffer(location.query.text).toString('base64')
    };
    element.dispatchEvent('animationstart');
  }
}

class HTMLSpanElement extends HTMLElement {
  constructor() {
    super('span');
  }
}

class HTMLDocument extends Node {
  constructor() {
    super('#document');
    this._documentElement = new HTMLHtmlElement();
    this._head = new HTMLHeadElement();
    this.appendChild(this._head);
    this.appendChild(this._documentElement);
  }

  querySelector(selector) {
    switch (selector) {
      case 'head':
        return this._head;
    }
  }

  createElement(tagName) {
    tagName = tagName.toLowerCase();
    switch (tagName) {
      case 'link':
        return new HTMLLinkElement();
      case 'span':
        return new HTMLSpanElement();
    }
    return new HTMLElement(tagName);
  }

  get documentElement() {
    return this._documentElement;
  }

  getElementById(id) {
    var result;
    function scan(childNodes) {
      childNodes.every(function(node) {
        if (node.id === id) {
          result = node;
        } else {
          scan(node.childNodes);
        }
        return !result;
      });
    }
    scan(this.childNodes);
    return result;
  }
}

class HTMLWindow extends EventTarget {
  constructor() {
    super();
    this._document = new HTMLDocument();
  }

  get document() {
    return this._document;
  }
  getComputedStyle(element, pseudoElt) {
    return element.computedStyle;
  }
}

var window = new HTMLWindow();

document = window.document;

global.window = window;
global.document = document;
global.getComputedStyle = window.getComputedStyle;
function atob(base64) {
  return new Buffer(base64, 'base64').toString();
}
global.atob = atob;