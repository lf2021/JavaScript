// 自调用函数 --- 食物的
(function () {
  // 用来保存每一个小方块食物
  var elements = [];

  function Food(x, y, width, height, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = height || 20;
    this.color = color || "green";
  }

  //为原型添加初始化的方法(作用：在页面上显示这个食物)
  //因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
  Food.prototype.init = function (map) {
    //先删除这个小食物
    //外部无法访问的函数
    remove();
    // 创建div
    var div = document.createElement("div");
    map.appendChild(div); //把 div 加到 map 中
    // 设置div样式
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;
    // 先脱离文档流
    div.style.position = "absolute";
    // 随机横纵坐标
    this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    elements.push(div); // 把 div加入到数组 elements 中
  };

  // 私有的函数---删除食物
  function remove() {
    // elements 数组中有这个食物
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      // 找到这个子元素的父级元素,然后删除这个子元素
      ele.parentNode.removeChild(ele);
      // 再次把elements中的这个子元素也要删除
      elements.splice(i, 1);
    }
  }

  // 把 Food 暴露给 window ，外部可以使用
  window.Food = Food;
}());