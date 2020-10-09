
//通过id获取 dom
function $id(id){
    return document.getElementById(id);
}

//事件兼容处理
function addEventListener(element,type,func){
            
    //如果有addEventListener就是用
    if(element.addEventListener){
        element.addEventListener(type,func);
    }else if(element.attachEvent){//反之 用attachEvent
        
        element.attachEvent('on'+type,func)
    }else{
        element['on'+type] = func;
    }  
}

//注销事件兼容处理
function removeEventListener(element,type,func){
            
    //如果有removeEventListener就是用
    if(element.removeEventListener){
        element.removeEventListener(type,func);
    }else if(element.detachEvent){//反之 用detachEvent
        
        element.detachEvent('on'+type,func)
    }else{
        element['on'+type] = null;
    }  
} 



//获取页面滚动区域
function getScroll(){
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    return {
        scrollLeft :scrollLeft,
        scrollTop : scrollTop
    };
}

//获取当前页面的区域
function getPage(e){
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clinetY + getScroll().scrollTop;

    return {
        pageX : pageX,
        pageY : pageY
    }
}