var can1 = document.getElementsByClassName('canvas1')[0],
    ctx1 = can1.getContext('2d'),
    cWidht = ctx1.canvas.width,
    cHeiht = ctx1.canvas.height,
    r = 10,
    size = r * 2,
    t = null,
    bodyNum = 3;

function Body(x, y, c){
  this.x = x;
  this.y = y;
  this.c = c;
}

Body.prototype.draw = function(){
  ctx1.fillStyle = this.c;

  ctx1.beginPath();
  ctx1.arc(this.x + r, this.y + r, r, 0, 2 * Math.PI, false);
  ctx1.fill();
}

function Snake(){
  this.snakeArr = [];
  this.bodySize = this.snakeArr.length || bodyNum;
  this.dir = 'DOWN';

  for(var i = 0; i < this.bodySize; i++){
    this.snakeArr.push(
      new Body(0, i * r * 2, (i === this.bodySize - 1 ? 'red' : 'green'))
    );
  }
}

Snake.prototype.move = function(){
  var head = this.snakeArr[this.snakeArr.length - 1],
      snakeArr = this.snakeArr,
      _self = this;

      createFood(snakeArr);

  t = setInterval(function(){
    for(var i = 0; i < snakeArr.length; i++){
      if(i !== snakeArr.length -1){
        ctx1.clearRect(snakeArr[i].x, snakeArr[i].y, size, size);
        snakeArr[i].x = snakeArr[i + 1].x;
        snakeArr[i].y = snakeArr[i + 1].y;
      }
    }

    if(_self.dir === 'DOWN'){
      head.y = head.y == (cHeiht - size) ? 0 : (head.y + size);
    }else if(_self.dir === 'UP'){
      head.y = head.y == 0 ? (cHeiht - size) : (head.y - size);
    }else if(_self.dir === 'RIGHT'){
      head.x = head.x == (cWidht - size) ? 0 : (head.x + size);
    }else if(_self.dir === 'LEFT'){
      head.x = head.x == 0 ? (cWidht - size) : (head.x - size);
    }

    for(var i = 0; i< snakeArr.length; i++){
      snakeArr[i].draw();
      
      if(i !== snakeArr.length - 1){
        if(head.x === snakeArr[i].x && head.y === snakeArr[i].y){
          clearInterval(t);
          ctx1.clearRect(0, 0, cWidht, cHeiht);
          alert('game over');
          s = new Snake();
          return;
        }
      }
    }

    if(s.foodX === head.x && s.foodY === head.y){
      var x, y;

      createFood(snakeArr);

      if(snakeArr[0].x === snakeArr[1].x){
        x = snakeArr[0].x;
        if(snakeArr[0].y > snakeArr[1].y){
          y = snakeArr[0].y + size;
        }else{
          y = snakeArr[0].y - size;
        }
      }else if(snakeArr[0].y === snakeArr[1].y){
        y = snakeArr[0].y;
        if(snakeArr[0].x > snakeArr[1].x){
          x = snakeArr[0].x + size;
        }else{
          x = snakeArr[0].x - size;
        }
      }

      snakeArr.unshift(
        new Body(x, y, 'green')
      );

    }
  }, 300) 
}

var s = new Snake();
s.move();

document.onkeydown = function(e){
  var e = e || window.event,
      code = e.keyCode;

  if(code === 38){
    s.dir = s.dir !== 'DOWN' ? 'UP' : 'DOWM';
  }else if(code === 40){
    s.dir = s.dir !== 'UP' ? 'DOWN' : 'UP';
  }else if(code === 37){
    s.dir = s.dir !== 'RIGHT' ? 'LEFT' : 'RIGHT';
    
  }else if(code === 39){
    s.dir = s.dir !== 'LEFT' ? 'RIGHT' : 'LEFT';
  }
}

function createFood(snakeArr){
  s.foodX = setRandPos().x;
  s.foodY = setRandPos().y;

  for(var i = 0; i < snakeArr.length; i++){
    if(s.foodX === snakeArr[i].x && s.foodY === snakeArr[i].y){
      s.foodX = setRandPos().x;
      s.foodY = setRandPos().y;
    }
  }

  new Body(s.foodX, s.foodY, 'yellow').draw()
}

function setRandPos(){
  var arr = [];

  for(var i = 0; i <= cWidht - size; i++){
    if(i % size === 0){
      arr.push(i)
    }
  }

  return {
    x: arr[Math.floor(Math.random() * arr.length + 1) - 1],
    y: arr[Math.floor(Math.random() * arr.length + 1) - 1]
  }
}
