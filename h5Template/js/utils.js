//图片上传至七牛
function getTokenUrl(bae64img, token, filekey) {
    let src;
    let url = 'http://upload.qiniu.com/putb64/-1/key/' + filekey;

    $.ajax({
        url: url,
        type: 'POST',
        async: false, //  这里我使用  同步的方式是为了把  得到的 src 返回出去
        beforeSend(request) { // 请求之前设置请求头
            request.setRequestHeader('Content-Type', 'application/octet-stream');
            request.setRequestHeader('Authorization', 'UpToken ' + token) // token服务端请求
        },
        data: bae64img,
        success: function (data) {
            src = 'http://cdn.yscase.com/' + data.key;
        }
    });
    return src;
}

// h5 常见问题 init
function h5Init() {
    // 禁止页面拖动
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {
        passive: false
    });

    // 安卓手机input获取焦点键盘上顶打乱布局方案
    var ua = window.navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
        var winHeight = document.body.clientHeight;
        window.onresize = function () {
            var thisHeight = window.innerHeight;
            if (winHeight - thisHeight > 50) {
                document.body.style.height = winHeight + 'px';
            } else {
                document.body.style.height = '100%';
            }
        }
    }

    // IOS input获取焦点后页面被上顶隐藏后留白问题
    var iptArr = document.querySelectorAll('input');
    iptArr.forEach(el => {
        el.addEventListener('blur', function () {
            // 滚动到顶部
            window.scroll(0, 0);
            // 滚动到底部
            window.scrollTo(0, document.documentElement.clientHeight);
        })
    })
}

// h5图片加载百分比
function imgLoading() {
    var imgs = document.querySelectorAll("img"),
        len = imgs.length,
        isInit = true,
        num = 0;

    imgs.forEach(function (item) { //遍历图片
        var img = new Image();
        // load = document.querySelector(".loading");

        img.onload = function () { //显示图片加载百分比
            num++;

            // 百分比计算 parseInt(num / len * 100) + "%"；

            if (num >= (len - 5) && isInit) { //所有图片加载完毕
                isInit = false;
                console.log('加载完毕')
            }
        }

        var elemt = item.getAttribute("src");
        img.src = elemt;
    })

}

//转base64
function getBase64Image(img, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
}


//封装typeof
function typeOf(value) {
    if (value == null) {
        return null
    }

    return typeof (value) == 'object' ? {
        '[object Object]': 'Object',
        '[object Array]': 'Array',
        '[object Number]': 'o-Number',
        '[object String]': 'o-String',
        '[object Boolean]': 'o-Boolean'
    } [Object.prototype.toString.call(value)] : typeof (value);
}


// 封装childNodes 只获取元素
function elemChildren(node) {
    var temp = {
        'length': 0,
        'splice': Array.prototype.splice //借用数组方法
    };
    len = node.childNodes.length; //获取父元素总节点长度

    for (var i = 0; i < len; i++) { //循环遍历节点
        var childItem = node.childNodes[i];
        if (childItem.nodeType === 1) { //判断是否元素节点
            temp[temp.length] = childItem; //对象length 下标赋值
            temp['length']++; //length自增1
        }
    }

    return temp
}

//原型 插入节点方法
Element.prototype.inserAfter = function (target, afterNode) { //父亲节点.inserAfter(新节点，新节点前一个节点)
    var nextElem = afterNode.nextElementSibling; //获取当前元素下一个兄弟元素
    if (nextElem) { //判断节点是否存在
        this.insertBefore(target, nextElem) //将target 插入nextElem 后面
    } else {
        this.appendChild(target) //元素最后插入
    }
}

// 倒计时使用
// let endTime = new Date(2020, 8, 30, 14, 40),
//     t = null;

// t = setInterval(function () {
//     console.log(new Date().countDateTime(endTime, t))
// }, 1000);
Date.prototype.countDateTime = function (endTime, timer) { //endTime活动结束时间  timer 对应setInterval
    var inDateTime = this.getTime(), //当前时间戳
        leftTime = (endTime - inDateTime) / 1000, //相减 除1000  获得时间差（秒）
        d, h, m, s;

    if (leftTime >= 0) {
        d = Math.floor(leftTime / 60 / 60 / 24); //天
        h = Math.floor(leftTime / 60 / 60 % 24); //小时
        m = Math.floor(leftTime / 60 % 60); //分
        s = Math.floor(leftTime % 60); //秒
    } else {
        clearInterval(timer) //活动结束停止

        return '倒计时结束'
    }



    return d + '天' + setZero(h) + '小时' + setZero(m) + '分钟' + setZero(s) + '秒';
}

function setZero(num) { //时分秒 小于10  前面加0
    return num < 10 ? '0' + num : num;
}

//电子时间
Date.prototype.getDateTime = function () {
    var year = this.getFullYear(),
        moth = this.getMonth() + 1,
        dat = this.getDate(),
        hos = this.getUTCHours(),
        mutes = this.getUTCMinutes(),
        secon = this.getUTCSeconds();

    return year + '-' + setZero(moth) + '-' + setZero(dat) + ' ' + setZero(hos) + ':' + setZero(mutes) + ':' + setZero(secon);
}

// 时间戳转换  
function timeTransition(time) {
    let date = new Date(time),
        year = date.getFullYear(),
        month = setZero(date.getMonth() + 1),
        day = setZero(date.getDate()),
        h = setZero(date.getHours()),
        m = setZero(date.getMinutes()),
        s = setZero(date.getSeconds());

    return {
        year, // 年
        month, // 月
        day, // 日
        h, // 时
        m, // 分
        s // 秒
    }

    return `${year}-${month}-${day} ${h}:${m}:${s}`
}


//寻找兄弟元素节点,参数  负数找之前 正数找之后  0找自己
function elemSibling(node, n) {

    while (n) {
        if (n > 0) { //判断n 大于0找之前
            node = node.nextSibling; // 赋值节点
            while (node && node.nodeType !== 1) { //node为true & node节点类型不为元素时执行
                node = node.nextSibling
            }
            n--;
        } else if (n < 0) { //小于0 找之后
            node = node.previousSibling;
            while (node && node.nodeType !== 1) {
                node = node.previousSibling
            }
            n++;
        }
    }

    return node
}

//找出一个元素的第N层父元素  elemParent(被查找子元素，查找第几层父元素)
function elemParent(node, n) {
    var type = typeof (n);

    //判断不等于空 或 非数字
    if (type === 'undefined') {
        return node.parentNode; //返回当前元素父节点
    } else if (n < 0 || type !== 'number') {
        return undefined
    }

    //递减判断父节点
    while (n) {
        node = node.parentNode;
        n--;
    }

    return node
}

//递归元素下所有节点
function getFullchildren(node) {
    var children = node.childNodes, //获取元素子节点集合
        len = children.length, //长度
        item;

    if (node && node.nodeType === 1) { //判断元素存在  & 为元素节点
        console.log(node)
    }

    for (var i = 0; i < len; i++) {
        item = children[i]; //赋值优化
        getFullchildren(item) //递归查找
    }
}

//浏览器滚动条滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else {
        return {
            top: document.body.scrollTop + document.documentElement.scrollTop,
            left: document.body.scrollLeft + document.documentElement.scrollLeft
        }
    }
}

//获取当前文档被点击坐标 (可用于鼠标对元素拖拽)
function pagePos(e) {
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;

    return { //e.client + 滚动条距离 - 偏移距离
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}

//获取浏览器可视窗口
function getViewportSize() {
    if (window.innerHeight) { //判断html5最新属性是否存在
        return {
            widht: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') { //判断怪异模式
            return {
                widht: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else { //标准模式
            return {
                widht: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}

//获取浏览器所有内容宽度 & 高度
function getScrollSize() {
    if (document.body.scrollHeight) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}

//获取元素距浏览器top&left总值
function getElemDocPosition(el) {
    var parent = el.offsetParent, //获取元素定位的父元素
        offseLeft = el.offsetLeft,
        offseTop = el.offsetTop;

    while (parent) {
        offseLeft += parent.offsetLeft; //元素left累加
        offseTop += parent.offsetTop; //元素top累加
        parent = parent.offsetParent; //赋值上一定位父元素
    }

    return {
        left: offseLeft,
        top: offseTop
    }
}

//获取元素style值  getStyles(box,'width')
function getStyles(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            // null 改为对应字符串伪元素 能获取伪元素属性值
            return parseInt(window.getComputedStyle(elem, null)[prop]);
        } else {
            return parseInt(window.getComputedStyle(elem, null));
        }
    } else {
        if (prop) {
            return parseInt(elem.currentStyle[prop])
        } else {
            return parseInt(elem.currentStyle);
        }
    }
}

//函数事件  惰性函数封装
function addEvent(el, type, fn, capture) {
    if (el.addEventListener) { //判断addEventListener是否存在
        addEvent = function (el, type, fn, capture) {
            el.addEventListener(type, fn, false)
        }
    } else if (el.attachEvent) { //判断ieattachEvent
        addEvent = function (el, type, fn) {
            el.attachEvent('on' + type, function () {
                fn.call(el) //改变this指向
            })
        }
    } else { //低版本
        addEvent = function (el, type, fn) {
            el['on' + type] = fn
        }
    }

    addEvent(el, type, fn, capture);
}

//删除事件
function removeEvent(elem, type, fn) {
    if (elem.addEventListener) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, fn);
    } else {
        elem['on' + type] = null;
    }
}

//阻止冒泡
function cancelBubble(e) {
    var e = e || window.event;

    if (e.stopPropagation) { //判断stopPropagation是否存在
        e.stopPropagation();
    } else { //反之 IE兼容
        e.cancelBubble = true;
    }
}

//阻止默认行为
function preventdefaultEvent(e) {
    var e = e || window.event;
    if (e.preventDefault) { //判断stopPropagation是否存在
        e.preventDefault();
    } else { //反之 IE兼容
        e.returnValue = false;
    }
}


// DOM模板替换
function setTplToHTML(tpl, regExp, opt) {
    return tpl.replace(regExp(), function (node, key) {
        console.log(node)
        return opt[key]
    })
}

function regTpl() {
    return new RegExp(/{{(.*?)}}/, 'gim')
}


//深拷贝
function deepClone(origin, target) {
    var target = target || {};
    var toStr = Object.prototype.toString;
    var arrType = '[object Array]';

    for (var key in origin) {
        if (origin.hasOwnProperty(key)) { //hasOwnProperty判断属性是否自己本身属性     原型继承来的则判断为假
            if (typeof (origin[key]) === 'object' && origin[key] !== null) {
                if (toStr.call(origin[key]) === arrType) {
                    target[key] = [];
                } else {
                    target[key] = {};
                }
                deepClone(origin[key], target[key])
            } else {
                target[key] = origin[key]
            }
        }
    }
    return target
}

//函数防抖: n秒内触发事件 就重新计时, 事件处理函数的程序将永远不能执行 debounce(被执行函数， 时间， true||false)
function debounce(fn, time, triggleNow) { // 防抖
    var t = null,
        res;

    var debounced = function () {
        var _self = this,
            args = arguments;

        if (t) {
            clearTimeout(t);
        }

        if (triggleNow) { //是否首次不延迟执行
            var exec = !t;

            t = setTimeout(function () { //n秒时间内频繁触发事件 计时器始终重新开始计时 且不执行
                t = null;
            }, time);
            if (exec) {
                res = fn.apply(_self, args);
            }
        } else {
            t = setTimeout(function () {
                res = fn.apply(_self, args)
            }, time)
        }

        return res;
    }

    debounced.remove = function () {
        clearTimeout(t);
        t = null;
    }

    return debounced;
}

//函数节流: 事件被触发，n秒之内只执行一次事件处理函数
function throttle(fn, delay) {
    var t = null,
        begin = new Date().getTime();

    return function () {
        var _self = this,
            args = arguments,
            cur = new Date().getTime();

        clearTimeout(t);

        if (cur - begin >= delay) { //时间戳相减 大于指定事件秒
            fn.apply(_self, args); //立即执行函数
            begin = cur; //初始时间戳 重新赋值当前时间戳
        } else {
            t = setTimeout(function () { // 反之延迟执行
                fn.apply(_self, args);
            }, delay)
        }
    }
}

// 获取url
function getQueryString() {
    const r = window.location.search.substr(1).split('&');

    return r.reduce((prev, item) => {
        let arr = item.split('=');
        prev[arr[0]] = arr[1];
        return prev
    }, {})
}

// 图片懒加载
function bindEvent() {
    win.onload = win.onscroll = throttle; //监听首次加载和滚动条事件 执行函数
}

function throttle() {
    if (t) return; //声明变量t    判断t是否存在
    t = setTimeout(function () {
        imgLazyLoad(imgs)();
        t = null; //事件执行后t = null
    }, 300)
}

function imgLazyLoad(image) {
    var imgLen = image.length,
        n = 0;
    return function () {
        var cHeight = document.documentElement.clientHeight,
            sTop = document.documentElement.scrollTop || document.body.scrollTop,
            imgItem;

        for (var i = n; i < imgLen; i++) {
            imgItem = image[i];

            if (imgItem.offsetTop <= cHeight + sTop) {
                imgItem.src = imgItem.getAttribute('data-src');
                n++
            }
        }
    }
}

//平滑滚动到页面指定位置
function smoothscroll(num) {
    window.scrollTo({
        top: num,
        behavior: "smooth" // 平滑滚动
    });
}



// 上下左右滑动
// tachMove(item)
function tachMove(targer, toTop, toRight, toBottom, toLeft) {
    var startx, starty, X, Y;
    targer.addEventListener("touchstart", function (e) { //第一次触摸
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    });

    targer.addEventListener("touchend", function (e) { //手指屏幕滑动
        X = (e.changedTouches[0].pageX) - startx;
        Y = (e.changedTouches[0].pageY) - starty;
        //判断上下左右滑动
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
            console.log('向右')
        } else if (Math.abs(X) > Math.abs(Y) && X < -12) {
            console.log('向左')
        } else if (Math.abs(Y) > Math.abs(X) && Y > 12) {
            console.log('向下')
        } else if (Math.abs(Y) > Math.abs(X) && Y < -12) {
            console.log('向上')
        }
    });
}



class EasyHttp {
    // get 
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    // post
    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    // put
    async put(url, data) {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }

    // delete
    async delete(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        const resData = await "数据删除成功!";
        return resData;
    }
}

const http = new EasyHttp;
// http.delete(url)
//   .then(data => console.log(data)) //成功
//   .catch(err => console.log(err));  //失败