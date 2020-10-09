
// //canvas刮刮乐
// ;(function(){
//   var can = document.getElementById('J_couponCanvas'),
//       ctx = can.getContext('2d'),
//       cWidth = ctx.canvas.width,
//       cHeight = ctx.canvas.height;

//   //绘制遮罩层
//   var couponCover = new Image();
//   couponCover.src = 'img/bg.jpg';

//   var init = function(){
//     bindEvent();

//     //禁止页面拖动
//     document.body.addEventListener('touchmove', function (e) {
//       e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
//     }, {passive: false});
//   }

//   function bindEvent(){
//     couponCover.addEventListener('load', drawMask, false);

//     can.addEventListener('touchstart', function(e){

//       touchStart(e); //手指第一次触摸

//       document.addEventListener('touchmove', touchMove, false); //手指滑动
//       document.addEventListener('touchend', touchEnd, false); //手指离开
//     }, false);
//   }

//   //绘制遮罩层
//   function drawMask(){
//     ctx.drawImage(couponCover, 0, 0, cWidth, cHeight);
//   };

//   //手指第一次触摸
//   function touchStart(e){
//     ctx.globalCompositeOperation = 'destination-out';
//     _setXY(e); //获取XY
    
//     if(x <= 0){
//       x = 0;
//     }else if(x >= can.offsetWidth){
//       x = can.offsetWidth;
//     }

//     if(y <= 0){
//       y = 0;
//     }else if(y >= can.offsetHeight){
//       y = can.offsetHeight;
//     }

//     ctx.beginPath();
//     ctx.lineCap = 'round';
//     ctx.lineJoin = 'round';
//     ctx.lineWidth = '15';
//     ctx.moveTo(x, y);
//   }

//   function touchMove(e){
//     _setXY(e);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//   }

//   function touchEnd(){
//     // revealImage();

//     document.removeEventListener('touchmove', touchMove, false);
//     document.removeEventListener('touchend', touchEnd, false);
//   }

//   function _setXY(e){
//     var e = e || window.event,
//         offset = getElemDocPosition(can),
//         top = document.body.scrollTop + document.documentElement.scrollTop,
//         left = document.body.scrollLeft + document.documentElement.scrollLeft;

//     x = e.touches[0].pageX - offset.x - left;
//     y = e.touches[0].pageY - offset.y - top;
//   }

//   //记录图片刮开60%以上显示完整优惠券
//   function revealImage(){
//     //getImageData本地存在跨域报错问题，上传服务器后正常

//     var res = ctx.getImageData(0, 0, cWidth, cHeight),  //记录图片信息 数组以rgba形式
//         imageData = res.data,
//         len = imageData.length,
//         count = 0,
//         item;

//     for(var i = 0; i < len; i++){
//       item = imageData[i];

//       if((i + 1) % 4 == 0 && item == 0){
//         count++
//       }
//     }

//     if(count > cWidth * cHeight * 0.6){
//       ctx.clearRect(0, 0, cWidth, cHeight);
//     }
//   }

//   init();
// })()

// //获取元素总偏移量
// function getElemDocPosition(el){
//   var parent = el.offsetParent,  //获取元素定位的父元素
//       offseLeft = el.offsetLeft, 
//       offseTop = el.offsetTop;

//   while(parent){
//     offseLeft += parent.offsetLeft;  //元素left累加
//     offseTop += parent.offsetTop;    //元素top累加
//     parent = parent.offsetParent;    //赋值上一定位父元素
//   }

//   return {
//     x: offseLeft,
//     y: offseTop
//   }
// }



//canvas刮刮乐
function Scavenger (opt){

  var can = document.getElementById(opt.id),
      ctx = can.getContext('2d'),
      cWidth = ctx.canvas.width,
      cHeight = ctx.canvas.height;

  //绘制遮罩层
  var couponCover = new Image();
  couponCover.src = opt.imgUrl;

  var init = function(){
    bindEvent();

    //禁止页面拖动
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false});
  }

  function bindEvent(){
    couponCover.addEventListener('load', drawMask, false);

    can.addEventListener('touchstart', function(e){

      touchStart(e); //手指第一次触摸

      document.addEventListener('touchmove', touchMove, false); //手指滑动
      document.addEventListener('touchend', touchEnd, false); //手指离开
    }, false);
  }

  //绘制遮罩层
  function drawMask(){
    ctx.drawImage(couponCover, 0, 0, cWidth, cHeight);
  };

  //手指第一次触摸
  function touchStart(e){
    ctx.globalCompositeOperation = 'destination-out';
    _setXY(e); //获取XY
    
    if(x <= 0){
      x = 0;
    }else if(x >= can.offsetWidth){
      x = can.offsetWidth;
    }

    if(y <= 0){
      y = 0;
    }else if(y >= can.offsetHeight){
      y = can.offsetHeight;
    }

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = '15';
    ctx.moveTo(x, y);
  }

  function touchMove(e){
    _setXY(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function touchEnd(){
    // revealImage();

    document.removeEventListener('touchmove', touchMove, false);
    document.removeEventListener('touchend', touchEnd, false);
  }

  function _setXY(e){
    var e = e || window.event,
        offset = getElemDocPosition(can),
        top = document.body.scrollTop + document.documentElement.scrollTop,
        left = document.body.scrollLeft + document.documentElement.scrollLeft;

    x = e.touches[0].pageX - offset.x - left;
    y = e.touches[0].pageY - offset.y - top;
  }

  //记录图片刮开60%以上显示完整优惠券
  function revealImage(){
    //getImageData本地存在跨域报错问题，上传服务器后正常

    var res = ctx.getImageData(0, 0, cWidth, cHeight),  //记录图片信息 数组以rgba形式
        imageData = res.data,
        len = imageData.length,
        count = 0,
        item;

    for(var i = 0; i < len; i++){
      item = imageData[i];

      if((i + 1) % 4 == 0 && item == 0){
        count++
      }
    }

    if(count > cWidth * cHeight * 0.6){
      ctx.clearRect(0, 0, cWidth, cHeight);
    }
  }

  //获取元素总偏移量
  function getElemDocPosition(el){
    var parent = el.offsetParent,  //获取元素定位的父元素
        offseLeft = el.offsetLeft, 
        offseTop = el.offsetTop;

    while(parent){
      offseLeft += parent.offsetLeft;  //元素left累加
      offseTop += parent.offsetTop;    //元素top累加
      parent = parent.offsetParent;    //赋值上一定位父元素
    }

    return {
      x: offseLeft,
      y: offseTop
    }
  }

  return init();
}

//插件化
var my = new Scavenger({
  id: 'J_couponCanvas',
  imgUrl: 'img/bg.jpg'
})

