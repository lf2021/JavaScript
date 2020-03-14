function my$(id) {
  return document.getElementById(id);
}

//设置任意元素的中间的文本内容
function setInnerText(element, text) {
  if (typeof element.textContent == "undefined") {
    element.innerText = text;
  } else {
    element.textContent = text;
  }
}
//获取任意元素的中间的文本内容
function getInnerText(element) {
  if (typeof element.textContent == "undefined") {
    return element.innerText;
  } else {
    return element.textContent;
  }
}


//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
  if (element.firstElementChild) { //true--->支持
    return element.firstElementChild;
  } else {
    var node = element.firstChild; //第一个节点
    while (node && node.nodeType != 1) {
      node = node.nextSibling;
    }
    return node;
  }
}
//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element) {
  if (element.lastElementChild) { //true--->支持
    return element.lastElementChild;
  } else {
    var node = element.lastChild; //第一个节点
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    }
    return node;
  }
}

//为任意元素.绑定任意的事件, 任意的元素,事件的类型,事件处理函数
function addEventListener(element, type, fn) {
  //判断浏览器是否支持这个方法
  if (element.addEventListener) { // 针对主流浏览器，除了 IE8 及更正版本
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) { // 针对 IE8 及更早版本
    element.attachEvent("on" + type, fn);
  } else {
    element["on" + type] = fn;
  }
}