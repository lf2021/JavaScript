// 自调用函数 --- 小蛇
(function () {
  var elements = []; //存放小蛇的每个身体部分

  function Snake(width, height, direction) {
    this.width = width || 20;
    this.height = height || 20;
    // 小蛇的身体
    this.body = [{
        x: 3,
        y: 2,
        color: "red"
      }, // 头
      {
        x: 2,
        y: 2,
        color: "orange"
      }, // 身体
      {
        x: 1,
        y: 2,
        color: "orange"
      } // 身体
    ];
    // 方向
    this.direction = direction || "right";
  }

  // 给 Snake 原型添加方法 --- 初始化
  Snake.prototype.init = function (map) {
    // 先删除之前的小蛇
    remove();
    // 循环遍历div
    for (var i = 0; i < this.body.length; i++) {
      // body中的每一个对象
      var obj = this.body[i];
      // 创建div
      var div = document.createElement("div");
      // 向map中添加div
      map.appendChild(div);
      // 设置div样式
      div.style.position = "absolute";
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      // 横纵坐标
      div.style.left = obj.x * this.width + "px";
      div.style.top = obj.y * this.height + "px";
      // 背景颜色
      div.style.backgroundColor = obj.color;
      // 方向
      // 把div加入到elements数组中----目的是为了删除
      elements.push(div);
    }
  };

  // 给 Snake 原型添加方法 --- 小蛇移动
  Snake.prototype.move = function (food, map) {
    // 思想： 把后一个的坐标给前一个，蛇头单独计算
    var i = this.body.length - 1; // 2
    for (; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 蛇头
    switch (this.direction) {
      case "right":
        this.body[0].x += 1;
        break;
      case "left":
        this.body[0].x -= 1;
        break;
      case "top":
        this.body[0].y -= 1;
        break;
      case "bottom":
        this.body[0].y += 1;
        break;
    }

    // 判断有没有吃到食物
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    // 判断小蛇的头部坐标是不是与食物坐标一致
    if (headX == food.x && headY == food.y) {
      // 获取小蛇最后的尾巴
      last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      // 把食物删除，重新初始化食物
      food.init(map);
    }
  };

  // 删除小蛇的私有的函数
  function remove() {
    var i = elements.length - 1; //2
    for (; i >= 0; i--) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele);
      elements.splice(i, 1);
    }
  }

  // 把 Snake 暴露给 window,外部可以使用
  window.Snake = Snake;
}());