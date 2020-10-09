;(function(){
  var canvas = document.getElementsByClassName('canvas1')[0],
      ctx = canvas.getContext('2d'),
      cWidth =ctx.canvas.width,
      cHeight =ctx.canvas.height,
      r = cWidth / 2,
      t = null;

  var Clock = function(opt){

  }

  Clock.prototype = {
    hours: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],

    init: function(){
      this.draw();

      t = setInterval(this.draw.bind(this), 1000)
    },

    draw: function(){
      ctx.clearRect(0, 0, cWidth, cHeight)
      var hours = this.getTime().hours,
          minutes = this.getTime().minutes,
          seconds = this.getTime().seconds;

      ctx.save();
      this.drawPanel();
      this.drawHourIndictor();
      this.drawHourIndicator(hours, minutes);
      this.drawMinutesIndicator(minutes);
      this.drawSecondsIndicator(seconds);
      this.drawCentralPoint();
      ctx.restore()
    },

    drawPanel: function(){  //时钟表盘
      ctx.translate(r, r)
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(0, 0, r - 25, 0, Math.PI * 2, false);
      ctx.fill();
    },

    drawHourIndictor: function(){ //绘制数字
      var hours = this.hours;

      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';
      ctx.fillStyle = '#424242';

      hours.forEach(function(elem, idx){
        var hNumsAngle = 2 * Math.PI / 12 * idx,
            x = Math.cos(hNumsAngle) * (r - 60),
            y = Math.sin(hNumsAngle) * (r - 60);

        ctx.beginPath();
        ctx.fillText(elem, x, y + 13)
      })
    },

    //绘制中心圆点
    drawCentralPoint: function(){
      ctx.beginPath();
      ctx.fillStyle = '#424242';
      ctx.arc(0, 0, 13, 0, 2 * Math.PI, false);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#999';
      ctx.arc(0, 0, 6, 0, 2 * Math.PI, false);
      ctx.fill();
    },

    //绘制时针
    drawHourIndicator: function(hours, minutes){
      var hAngle = 2 * Math.PI / 12 * hours,
          mAngle = 2 * Math.PI / 12 / 60 * minutes;

      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      ctx.rotate(hAngle + mAngle);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r * 0.45);
      ctx.stroke()
      ctx.restore()
    },

    //绘制分针
    drawMinutesIndicator: function(minutes){
      var mAngle = 2 * Math.PI / 60 * minutes;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#424242';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      ctx.rotate(mAngle)
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r * 0.65);
      ctx.stroke();
      ctx.restore();
    },

    //绘制秒针
    drawSecondsIndicator: function(second){
      var sAngle = 2 * Math.PI / 60 * second;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      ctx.rotate(sAngle)
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r * 0.75);
      ctx.stroke();
      ctx.restore();
    },

    getTime: function(){
      var d = new Date();

      return {
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds()
      }
    }
  }


  window.Clock = Clock;
})()

new Clock().init();