var EventUtil = {
  /**绑定事件
   * element是元素结点
   * type事件类型
   * handler是事件句柄
   */
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      // 除了IE8 以下
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // IE8 以下
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  /**去除事件
   * element是元素节点
   * type事件类型
   * handler是事件句柄
   */
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      // W3C 阻止默认行为
      event.preventDefault();
    } else {
      // IE 阻止默认行为
      event.returnValue = false;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      // W3C 阻止冒泡
      event.stopPropagation();
    } else {
      // IE 阻止冒泡
      event.cancelBubble = true;
    }
  },
};
