// 自调用函数 --- 游戏对象
(function () {
  var that = null; // 该变量的目的就是为了保存游戏Game的实例对象

  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this; // 保存当前的实例对象到that变量中
  }

  // 初始化游戏-----可以设置小蛇和食物显示出来
  Game.prototype.init = function () {
    // 初始化游戏
    // 食物初始化
    this.food.init(this.map);
    // 小蛇初始化
    this.snake.init(this.map);
    // 调用自动移动小蛇的方法
    this.runSnake(this.food, this.map);
    // 调用按键方法
    this.bindKey();
  };

  // 添加原型方法---设置小蛇可以自动的跑起来
  Game.prototype.runSnake = function (food, map) {
    // 自动的去移动
    var timeId = setInterval(function () {
      // 此时的 this是指 window
      // 移动小蛇
      this.snake.move(food, map);
      // 初始化小蛇
      this.snake.init(map);

      // 横纵坐标的最大值
      var maxX = map.offsetWidth / this.snake.width; // 40
      var maxY = map.offsetHeight / this.snake.height;
      // 小蛇的头坐标
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      // 判断是否超出边界
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        clearInterval(timeId);
        alert("游戏结束!您的游戏得分："+this.snake.body.length);
      }
    }.bind(that), 70); // bind改变了 this的指向
  };

  // 添加原型方法---设置用户按键，改变小蛇移动方向
  Game.prototype.bindKey = function () {
    document.addEventListener("keydown", function (e) {
      // 这里的this应该是触发keydown的事件的对象---document,
      // 所以,这里的this就是document
      // 获取按键的值
      switch (e.keyCode) {
        case 37:
          this.snake.direction = "left";
          break;
        case 38:
          this.snake.direction = "top";
          break;
        case 39:
          this.snake.direction = "right";
          break;
        case 40:
          this.snake.direction = "bottom";
          break;
      }
    }.bind(that), false);
  };

  // 把 Game方法暴露给window,外部可以使用
  window.Game = Game;
}());