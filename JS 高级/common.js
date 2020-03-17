/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
  var str = ""; //存储时间的字符串
  //获取年
  var year = dt.getFullYear();
  //获取月
  var month = dt.getMonth() + 1;
  //获取日
  var day = dt.getDate();
  //获取小时
  var hour = dt.getHours();
  //获取分钟
  var min = dt.getMinutes();
  //获取秒
  var sec = dt.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
  return str;
}

/**
 * 获取指定标签对象
 * @param id 标签的id属性值
 * @returns {Element}根据id属性值返回指定标签对象
 */
function my$(id) {
  return document.getElementById(id);
}

/**
 * 设置元素的文本内容
 * @param element 任意元素
 * @param text 任意文本内容
 */
function setInnerText(element, text) {
  if (typeof element.textContent == "undefined") {
    element.innerText = text;
  } else {
    element.textContent = text;
  }
}

/**
 * 获取元素的文本内容
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
  if (typeof element.textContent == "undefined") {
    return element.innerText;
  } else {
    return element.textContent;
  }
}

/**
 * 获取父级元素中的第一个子元素
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
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

/**
 * 获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
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

/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElementSibling(element) {
  if (element.previousElementSibling) {
    return element.previousElementSibling
  } else {
    var node = element.previousSibling; // 上一个兄弟节点
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    }
    return node;
  }
}

/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElementSibling(element) {
  if (element.nextElementSibling) {
    return element.nextElementSibling
  } else {
    var node = element.nextSibling; // 下一个兄弟节点
    while (node && node.nodeType != 1) {
      node = node.nextSibling;
    }
    return node;
  }
}

/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
  if (!element) return;
  var elements = [];
  var ele = element.previousSibling;
  while (ele) {
    if (ele.nodeType === 1) {
      elements.push(ele);
    }
    ele = ele.previousSibling;
  }
  ele = element.nextSibling;
  while (ele) {
    if (ele.nodeType === 1) {
      elements.push(ele);

    }
    ele = ele.nextSibling;
  }
  return elements;
}

/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser() {
  var browserName = navigator.userAgent.toLowerCase();
  if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
    console.log("IE");
  } else if (/firefox/i.test(browserName)) {
    console.log("Firefox");
  } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
    console.log("Chrome");
  } else if (/opera/i.test(browserName)) {
    console.log("Opera");
  } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
    console.log("Safari");
  } else {
    console.log("不知道什么鬼!");
  }
}

//为任意一个元素绑定事件:元素,事件类型,事件处理函数
function addEventListener(element, type, fn) {
  if (element.addEventListener) { //支持
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fn);
  } else {
    element["on" + type] = fn;
  }
}

//为任意的一个元素解绑某个事件:元素,事件类型,事件处理函数
function removeEventListener(element, type, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fn, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, fn);
  } else {
    element["on" + type] = null;
  }
}

/*
* element---任意的元素
* attr---属性
* */
function getAttrValue(element,attr) {
  return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}

/*
 * element----要移动的元素
 * target----移动的目标
 * 初级版本
 * */
/*
 * 终极版本的动画函数---有bug
 *
 * */
function animate(element, json, fn) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    var flag = true; //假设都达到了目标
    for (var attr in json) {
      if (attr == "opacity") { //判断属性是不是opacity
        var current = getAttrValue(element, attr) * 100;
        //每次移动多少步
        var target = json[attr] * 100; //直接赋值给一个变量,后面的代码都不用改
        var step = (target - current) / 10; //(目标-当前)/10
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[attr] = current / 100;
      } else if (attr == "zIndex") { //判断属性是不是zIndex
        element.style[attr] = json[attr];
      } else { //普通的属性

        //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
        var current = parseInt(getAttrValue(element, attr)) || 0;
        //每次移动多少步
        var target = json[attr]; //直接赋值给一个变量,后面的代码都不用改
        var step = (target - current) / 10; //(目标-当前)/10
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        element.style[attr] = current + "px";
      }
      if (current != target) {
        flag = false; //如果没到目标结果就为false
      }
    }
    if (flag) { //结果为true
      clearInterval(element.timeId);
      if (fn) { //如果用户传入了回调的函数
        fn(); //就直接的调用,
      }
    }
    console.log("target:" + target + "current:" + current + "step:" + step);
  }, 10);
}