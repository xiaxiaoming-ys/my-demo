

window.onload = function(){
  init()
}

function init(){
  animation();
}

var animation = (function(){
  var oAni = document.getElementsByClassName('ani')[0],
      oGirl = document.getElementsByClassName('girl')[0],
      oPlane = document.getElementsByClassName('plane')[0],
      J_data = document.getElementById('J_data').innerHTML,
      oAniIdx = 0,
      oGirlIdx = 0;

  bindEvent()

  function bindEvent(){
    init();
    continuousAnimation(oPlane, 100);
    tachMove(document);
  }

  //初始化样式
  function init(){
    LoadPicture({
      dom: oAni,   //背景图
      start: 701,
      end: 750,
      address: 'ani'
    })
    LoadPicture({
      dom: oGirl,  //女孩
      start: 160,
      end: 222,
      address: 'girl'
    })
    LoadPicture({
      dom: oPlane,  //飞机
      start: 408,
      end: 433,
      address: 'plane'
    })

    //禁止页面拖动
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false});
  }
  
  //载入图片
  function LoadPicture(opt){
    var list = '';  //节点字符串容器
  
    for(var i = opt.start; i < opt.end; i++){
      list += J_data.replace(/{{(.*?)}}/g, function(node, key){
        return {
          res: opt.address,
          img: i
        }[key]
      })
    }
  
    opt.dom.innerHTML = list;  //字符串写入父节点
  
    var domImg = opt.dom.getElementsByTagName('img')[0];
    domImg.className = 'cur';  //第一张图片显示
  }
  
  //持续动画
  function continuousAnimation(dom, time){
    var img = dom.getElementsByTagName('img'),  //获取dom下所有图片
        len = img.length,                       //长度获取
        item,     //优化
        idx = 0;
  
    setInterval(function(){  //持续函数
      for(var i = 0; i < len; i++){  //隐藏图片
        item = img[i];
        item.className = '';
      }
  
      img[idx].className = 'cur';  //显示当前索引图
      idx++;                       //idx持续++
  
      if(idx >= len){              //大于图片长度重赋值为0
        idx = 0;
      }
    }, time)
  }
  
  //手指滑动执行动画
  function tachMove(targer){
    var startx,starty,X,Y;

    targer.addEventListener("touchstart",function(e){ //第一次触摸
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    });
  
    targer.addEventListener("touchmove",function(e){ //手指屏幕滑动
      X = (e.touches[0].pageX) - startx;
      Y = (e.touches[0].pageY) - starty;
  
      if( Math.abs(Y) > Math.abs(X) && Y < -12 ){
        throttle(oAniIdx, 'plue', 100);   //节流函数
        throttle(oGirlIdx, 'plue', 100);  //节流函数
      }
      else if( Math.abs(Y) > Math.abs(X) && Y > 12 ){
        throttle(oAniIdx, 'null', 100);   //节流函数
        throttle(oGirlIdx, 'null', 100);  //节流函数
      }

      slidingAnimation(oAni, oAniIdx);    //切换class执行动画
      slidingAnimation(oGirl, oGirlIdx);  //切换class执行动画
    });
  }
  
  //切换class执行动画
  function slidingAnimation(dom, indexs){
    var img = dom.getElementsByTagName('img'),  //获取父元素下所有帧动画图片
        len = img.length,     //长度获取
        item;                 //赋值优化
  
    indexs = indexs >= len ? (len - 1) : indexs;  //indexs固定图片长度范围内
  
    for(var i = 0; i< len; i++){   //隐藏图片
      item = img[i];
      item.className = '';
    }
  
    img[indexs].className = 'cur';  //当前索引图显示
  }
  
  //节流函数
  function throttle(idx, table, delay){
    var t = null;   //声明计时器
  
    if(t) return;   //判断是否存在等待执行
  
    t = setTimeout(function(){  //赋值标记
      if(table === 'plue'){     //等于特定字符串成立
        idx++;                  //标记++
      }else{
        idx--;                  //标记--
      }
  
      if(idx <= 0){             //不小于0
        idx = 0
      }
  
      oAniIdx = idx;            //重新赋值给外界当前图片索引
      oGirlIdx = idx;
    }, delay);
  }
});







// window.onload = function(){
//   init()
// }

// function init(){
//   animation();
// }

// var animation = (function(){
//   var oAni = document.getElementsByClassName('ani')[0],
//       oGirl = document.getElementsByClassName('girl')[0],
//       oPlane = document.getElementsByClassName('plane')[0],
//       J_data = document.getElementById('J_data').innerHTML,
//       oAniIdx = 0,
//       oGirlIdx = 0;

//   var myCanvas = "<canvas class='canvas1' width='" + screen.availWidth + "px' height='"+ screen.availHeight + "px'></canvas>",
//       oBox = document.getElementsByClassName('box')[0]
//       oBox.insertAdjacentHTML("beforeEnd", myCanvas),
//       canvas1 = document.getElementsByClassName('canvas1')[0],
//       ctx1 = canvas1.getContext('2d'),
//       canvas2 = document.getElementsByClassName('canvas2')[0],
//       ctx2 = canvas2.getContext('2d'),
//       cWidht = ctx1.canvas.width,
//       cHeight = ctx1.canvas.height;

//   bindEvent()

//   function bindEvent(){
//     init();
//     continuousAnimation(oPlane, 100);
//     tachMove(document);
//   }

//   //初始化样式
//   function init(){
//     LoadPicture({
//       dom: oAni,   //背景图
//       start: 701,
//       end: 750,
//       address: 'ani'
//     })
//     LoadPicture({
//       dom: oGirl,  //女孩
//       start: 160,
//       end: 222,
//       address: 'girl'
//     })
//     LoadPicture({
//       dom: oPlane,  //飞机
//       start: 408,
//       end: 433,
//       address: 'plane'
//     })

//     //禁止页面拖动
//     document.body.addEventListener('touchmove', function (e) {
//       e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
//     }, {passive: false});

//     var oAniImg = oAni.getElementsByTagName('img')[0],
//         oGirlImg = oGirl.getElementsByTagName('img')[0];

//     oAniImg.addEventListener('load', show.bind(this, oAniImg), false)
//     oGirlImg.addEventListener('load', show.bind(this, oGirlImg), false)
//   }

//   //初始化显示图片
//   function show(img){
//     ctx1.drawImage(img, 0, 0, cWidht, cHeight);
//   }

//   //载入图片
//   function LoadPicture(opt){
//     var list = '';  //节点字符串容器
  
//     for(var i = opt.start; i < opt.end; i++){
//       list += J_data.replace(/{{(.*?)}}/g, function(node, key){
//         return {
//           res: opt.address,
//           img: i
//         }[key]
//       })
//     }
  
//     opt.dom.innerHTML = list;  //字符串写入父节点
//   }
  
//   //持续动画
//   function continuousAnimation(dom, time){
//     var img = dom.getElementsByTagName('img'),  //获取dom下所有图片
//         len = img.length,                       //长度获取
//         idx = 0;

//     ctx2.beginPath()
//     setInterval(function(){  //持续函数
//       ctx2.clearRect(0, 0, 150, 150);
//       img[idx].onload = function(){
//         ctx2.drawImage(img[idx], 0, 0, 150, 150);
//       }
//       requestAnimationFrame(img[idx].onload)
//       idx++;                       //idx持续++
  
//       if(idx >= len){              //大于图片长度重赋值为0
//         idx = 0;
//       }
//     }, time)
//   }
  
//   //手指滑动执行动画
//   function tachMove(targer){
//     var startx,starty,X,Y;

//     targer.addEventListener("touchstart",function(e){ //第一次触摸
//       startx = e.touches[0].pageX;
//       starty = e.touches[0].pageY;
//     });
  
//     targer.addEventListener("touchmove",function(e){ //手指屏幕滑动
//       X = (e.touches[0].pageX) - startx;
//       Y = (e.touches[0].pageY) - starty;
  
//       if( Math.abs(Y) > Math.abs(X) && Y < -12 ){
//         throttle(oAniIdx, 'plue', 100);   //节流函数
//         throttle(oGirlIdx, 'plue', 100);  //节流函数
//       }
//       else if( Math.abs(Y) > Math.abs(X) && Y > 12 ){
//         throttle(oAniIdx, 'null', 100);   //节流函数
//         throttle(oGirlIdx, 'null', 100);  //节流函数
//       }
  
//       slidingAnimation(oAni, oAniIdx);    //切换class执行动画
//       slidingAnimation(oGirl, oGirlIdx);  //切换class执行动画
//     });
//   }
  
//   //切换class执行动画
//   function slidingAnimation(dom, indexs){
//     var img = dom.getElementsByTagName('img'),
//         len = img.length;  //获取父元素下所有帧动画图片

//     indexs = indexs >= len ? (len - 1) : indexs;  //indexs固定图片长度范围内

//     ctx1.beginPath();
//     ctx1.clearRect(0, 0, cWidht, cHeight);
//     img[indexs].onload = function(){
//       ctx1.drawImage(img[indexs], 0, 0, cWidht, cHeight);
//     }

//     requestAnimationFrame(img[indexs].onload)
//   }
  
//   //节流函数
//   function throttle(idx, table, delay){
//     var t = null;   //声明计时器
  
//     if(t) return;   //判断是否存在等待执行
  
//     t = setTimeout(function(){  //赋值标记
//       if(table === 'plue'){     //等于特定字符串成立
//         idx++;                  //标记++
//       }else{
//         idx--;                  //标记--
//       }
  
//       if(idx <= 0){             //不小于0
//         idx = 0
//       }
  
//       oAniIdx = idx;            //重新赋值给外界当前图片索引
//       oGirlIdx = idx;
//     }, delay);
//   }
// });




// window.onload = function () {
//   //禁止页面拖动
//   document.body.addEventListener('touchmove', function (e) {
//     e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
//   }, {passive: false});

//   init();
// }

// function init(){
//   lodingInit();
// }

// var lodingInit = (function(){
//   var oPlane = document.getElementsByClassName('plane')[0],
//       oGirl = document.getElementsByClassName('girl')[0],
//       oAni = document.getElementsByClassName('ani')[0],
//       section1 = document.getElementsByClassName('section-1')[0],
//       J_data = document.getElementById('J_data').innerHTML;

//   var domImgs = [
//         {dom: oPlane, start: 408, end: 433, address: 'plane'}, //飞机
//         {dom: oAni, start: 701, end: 750, address: 'ani'}, //背景
//         {dom: oGirl, start: 160, end: 222, address: 'girl'}  //女孩
//       ];

//   bindEvent()

//   function bindEvent(){
//     LoadPicture(domImgs[0], J_data);
//     continuousAnimation(oPlane, 100);
//     LoadPicture(domImgs[1], J_data);
//     LoadPicture(domImgs[2], J_data);
//     loading(section1);
//   }

//   function loading(section1){
//     var imgs = section1.getElementsByTagName("img"),
//         arrImg = Array.prototype.slice.call(imgs),
//         oH1 = document.getElementsByClassName("oH1")[0], //显示百分比
//         oH6 = document.getElementsByClassName("oH6")[0],
//         num = 0;  //获取所有图片

//     arrImg.forEach(function(i, index){
//       var img = new Image();

//       img.onload = function () {
//         num++;

//         oH1.innerHTML=parseInt(num / imgs.length * 100) + "%";
//         oH6.innerHTML = num;
//         if(num == imgs.length){
//   　　　　//页面加载完成执行代码
//           // alert('图片加载完成');
//         }
//       }

//       var elemt = i.getAttribute("src");
//           img.src = elemt;

//     })
//   }

//   //加载图片
//   function LoadPicture(opt, J_data){
//     var list = '';  //节点字符串容器
//     for(var i = opt.start; i <= opt.end; i++){
//       list += J_data.replace(/{{(.*?)}}/g, function(node, key){
//         return {
//           res: opt.address,
//           img: i
//         }[key]
//       })
//     }

//     opt.dom.innerHTML = list;  //字符串写入父节点
//     // var domImg = opt.dom.getElementsByTagName('img')[0];
//     // domImg.className = 'cur';  //第一张图片显示
//   }

//   // //持续动画
//   // function continuousAnimation(dom, time){
//   //   var img = dom.getElementsByTagName('img'),  //获取dom下所有图片
//   //       len = img.length,                       //长度获取
//   //       item,
//   //       idx = 0,
//   //       t;

//   //   t = setInterval(function(){  //持续函数
//   //     var oH1 = document.getElementsByClassName("oH1")[0].innerHTML;
//   //     for(var i = 0; i < len; i++){  //隐藏图片
//   //       item = img[i];
//   //       item.className = '';
//   //     }

//   //     img[idx].className = 'cur';  //显示当前索引图
//   //     idx++;                       //idx持续++
  
//   //     if(idx >= len){              //大于图片长度重赋值为0
//   //       idx = 0;
//   //     }
//   //     // oH1 ==='100%' && clearInterval(t)   
//   //   }, time)
//   // }


//   function continuousAnimation(dom, time){
//         var img = dom.getElementsByTagName('img'),  //获取dom下所有图片
//             len = img.length,                       //长度获取
//             idx = 0;

//         var canvas2 = document.getElementsByClassName('canvas2')[0],
//             ctx2 = canvas2.getContext('2d'),
//             crtCanvas = document.createElement('canvas'),
//             crtCtx = crtCanvas.getContext('2d');
//         crtCanvas.width = canvas2.width;  
//         crtCanvas.height = canvas2.height;  

//         // ctx2.beginPath()
//         setInterval(function(){
//           ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
//           crtCtx.clearRect(0, 0, crtCanvas.width, crtCanvas.height);

//           img[idx].onload = function(){
//             crtCtx.drawImage(img[idx], 0, 0, 150, 150);
//             ctx2.drawImage(crtCanvas, 0, 0, 150, 150);
//           }
//           requestAnimationFrame(img[idx].onload)
//           idx++;                       //idx持续++

//           idx = idx >= len ? 0 : idx;  //大于图片长度重赋值为0
//         }, time)
//       }
// });







//获取元素style值  getStyles(box,'width')
function getStyles(elem, prop){
  if(window.getComputedStyle){
    if(prop){
      // null 改为对应字符串伪元素 能获取伪元素属性值
      return window.getComputedStyle(elem, null)[prop];
    }else{
      return window.getComputedStyle(elem, null);
    }
  }else{
    if(prop){
      return elem.currentStyle[prop];
    }else{
      return elem.currentStyle;
    }
  }
}
