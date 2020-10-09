// 图片编辑分割线、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map

/**
 * 图像旋转、缩放、移动 jquery 插件
 * 依赖: hammer.js 手势库
 * 最后修改时间：2016-9-19 18:43:52
 */

window.spanTransform = {
    height: 325.9099099099099,
    initLeft: 0,
    initTop: 137.04504504504504,
    width: 456,
    x : 0,
    y : 0,
    scale :1,
    rotation : 0
};


;(function($, window, Hammer) {
    $.fn.ImageEditor = function(options) {

        function ImageEditor($el, options) {

            // default options of ImageEditor
            var defaults = {
                // width: 456,
                // height: 600,
                width: $('.usImgBox').width(),
                height: $('.usImgBox').height(),
                imageUrls: [],
                removeIcon: 'images/delete.png',
                removeIconSize: 30,
                addImageAnimation: true,
                removeImageAnimation: true,
                onImagesLoaded: function() {},
                onInitCompleted: function() {}
            };

            this.$el = $el;
            this.options = $.extend(defaults, options);

            this.inited = false;
            this.images = [];
            this.activeImage = null;

            this.startCenterPoint = {x: 0, y : 0};
            this.startPan = {x: 0, y : 0};
            this.startRotation = 0;
            this.startScale = 1;

            this.hammerManager = new Hammer.Manager($el[0]);

            this._init();
        }

        ImageEditor.prototype = {
            constructor: ImageEditor,

            _init: function() {
                // init container
                this.$el.css('position', 'relative');
                this.$el.css('height', this.options.height);
                this.$el.css('width', this.options.width);
                // this.$el.css('overflow', 'hidden');

                // init hammer
                this.hammerManager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
                this.hammerManager.add(new Hammer.Swipe()).recognizeWith(this.hammerManager.get('pan'));
                this.hammerManager.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(this.hammerManager.get('pan'));
                this.hammerManager.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([this.hammerManager.get('pan'), this.hammerManager.get('rotate')]);

                this.hammerManager.on("panstart panmove", this._onPan.bind(this));
                this.hammerManager.on("rotatestart rotatemove", this._onRotate.bind(this));
                this.hammerManager.on("pinchstart pinchmove", this._onPinch.bind(this));

                // load images
                this._loadImage(this.options.imageUrls);
            },

            _loadImage: function(urls) {
                var that = this;

                if(!(urls instanceof Array))
                    urls = [urls];

                urls.forEach(function(url) {
                    that.addImage(url);
                });
            },

            _placeImage: function(image) {
                var img = image.img,
                    index = image.order;

                var $img = $(img),
                    $imgWrapper = image.$imgWrapper,
                    containerWidth = this.options.width,
                    containerHeight = this.options.height,
                    naturalWidth = img.naturalWidth,
                    naturalHeight = img.naturalHeight,
                    ratio = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight),
                    newWidth = naturalWidth * ratio,
                    newHeight = naturalHeight * ratio,
                    top = 0, left = 0;

                if((containerWidth - newWidth) > (containerHeight - newHeight))
                    left = (containerWidth - newWidth) / 2;
                else
                    top = (containerHeight - newHeight) / 2;

                  
                $imgWrapper.css('left', left);
                $imgWrapper.css('top', top);
                $imgWrapper.css('box-sizing', 'border-box');

                image.width = newWidth;
                image.height = newHeight;
                //===========================================
                spanTransform.initLeft = left;
                spanTransform.initTop = top;
                spanTransform.width = newWidth; 
                spanTransform.height = newHeight; 
                //===========================================
                image.centerPoint = {x: left + newWidth / 2, y: top + newHeight / 2};
                
                $img.css('width', newWidth);
                $img.css('height', newHeight);

                $imgWrapper.css('position', 'absolute');
                $imgWrapper.css('z-index', 5 + index);

                new Hammer($imgWrapper[0]).on('tap', function() {
                    if(image.clickToSelect)
                        this.selectImage(image);

                    image.onClick && image.onClick();
                }.bind(this));


                var $mask = $('<span>')
                    .css('position', 'absolute')
                    .css('top', 0)
                    .css('bottom', 0)
                    .css('left', 0)
                    .css('right', 0)
                    .css('z-index', 9)
                    .css('background', 'rgba(0,0,0,0)');

                $imgWrapper.append($mask);
                image.$mask = $mask;

                // close button
                // var $removeIcon = $('<img>')
                //     .css('position', 'absolute')
                //     .css('top', 0)
                //     .css('right', 0)
                //     .css('width', this.options.removeIconSize)
                //     .css('z-index', 10)
                //     .attr('src', this.options.removeIcon);
                //
                // if(image.closeButtonRequire) {
                //   new Hammer($removeIcon[0]).on('tap', function(e) {
                //     this.removeImage(image);
                //   }.bind(this));
                //
                //   $imgWrapper.append($removeIcon);
                // }

                //image.$removeIcon = $removeIcon;

                // append img wrapper
                this.$el.append($imgWrapper);

                if(this.options.addImageAnimation) {
                    // add image fade in animation
                    $imgWrapper.css('display', 'none');
                    $imgWrapper.fadeIn('fast');
                }
            },

            _updateImageTransform: function(image) {
                var transform = image.transform,
                    imgWrapper = image.$imgWrapper[0],
                    //removeIcon = image.$removeIcon[0],
                    value = [
                        'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
                        'scale(' + transform.scale + ', ' + transform.scale + ')',
                        'rotate('+ transform.rotation + 'deg)'
                    ].join(''),
                    removeIconValue = 'scale(' + 1 / transform.scale + ', ' + 1 / transform.scale + ')';

                    spanTransform.x = transform.translate.x;
                    spanTransform.y = transform.translate.y;
                    spanTransform. scale =  transform.scale;
                    spanTransform.rotation = transform.rotation;
                   
                      
                       
                        
                    
                    // console.log( $('.userSpan').offset().left)
                    
                imgWrapper.style.webkitTransform = value;
                imgWrapper.style.mozTransform = value;
                imgWrapper.style.transform = value;
                // keep remove icon not scaled
                // removeIcon.style.webkitTransform = removeIconValue;
                // removeIcon.style.mozTransform = removeIconValue;
                // removeIcon.style.transform = removeIconValue;
            },

            _onPan: function(e) {
                var image = this.activeImage;

                if(e.type == 'panstart') {
                    this.startPan = {
                        x: image.transform.translate.x,
                        y: image.transform.translate.y
                    };

                    this.startCenterPoint = {
                        x: image.centerPoint.x,
                        y: image.centerPoint.y
                    };
                }

                image.transform.translate = {
                    x: this.startPan.x + e.deltaX,
                    y: this.startPan.y + e.deltaY
                };

                image.centerPoint = {
                    x: this.startCenterPoint.x + e.deltaX,
                    y: this.startCenterPoint.y + e.deltaY
                };

                this._updateImageTransform(image);
                e.preventDefault();
            },

            _onRotate: function(e) {
                var image = this.activeImage;

                if(e.type == 'rotatestart')
                    this.startRotation = image.transform.rotation;

                image.transform.rotation = this.startRotation + e.rotation;
                this._updateImageTransform(image);
                e.preventDefault();
            },

            _onPinch: function(e) {
                var image = this.activeImage, scale;

                if(e.type == 'pinchstart')
                    this.startScale = image.transform.scale;

                scale = this.startScale * e.scale;

                // set restriction of scale: 0.2 ~ 5
                if(scale < 0.2)
                    image.transform.scale = 0.2;
                else if(scale > 5)
                    image.transform.scale = 5;
                else
                    image.transform.scale = scale;

                this._updateImageTransform(image);
                e.preventDefault();
            },

            _drawImage: function(image, ctx) {
                var transform = image.transform;

                ctx.save();

                ctx.translate(image.centerPoint.x, image.centerPoint.y);
                ctx.rotate(transform.rotation * Math.PI / 180);
                ctx.translate(-image.centerPoint.x, -image.centerPoint.y);

                ctx.scale(transform.scale, transform.scale);

                ctx.drawImage(image.img,
                    (image.centerPoint.x - image.width * transform.scale / 2) / transform.scale,
                    (image.centerPoint.y - image.height * transform.scale / 2) / transform.scale,
                    image.width,
                    image.height
                );

                ctx.restore();
            },

            _preProcessImageUrl: function(url) {
                var defaultObj = {
                    url: '',
                    closeButtonRequire: true,
                    clickToSelect: true,
                    onClick: null
                };

                if(typeof url == 'string') {
                    defaultObj.url = url;
                } else if(typeof url == 'object') {
                    defaultObj = $.extend(defaultObj, url);
                }

                //console.log('pre process', defaultObj);
                return defaultObj;
            },

            moveImage: function(deltaX, deltaY) {
                var image = this.activeImage;
                image.transform.translate = {
                    x: image.transform.translate.x + deltaX,
                    y: image.transform.translate.y + deltaY
                };

                image.centerPoint = {
                    x: image.centerPoint.x + deltaX,
                    y: image.centerPoint.y + deltaY
                };

                this._updateImageTransform(image);
            },

            rotateImage: function(deg) {
                var image = this.activeImage;
                image.transform.rotation = this.startRotation + deg * 1;
                // image.transform.rotation = 10;
                this._updateImageTransform(image);
            },

            scaleImage: function(scale) {
                var image = this.activeImage;
                image.transform.scale = scale;
                // image.transform.scale = 0.5;
                this._updateImageTransform(image);
            },

            addImage: function(url, select) {
                url = this._preProcessImageUrl(url);

                if(select === undefined)
                    select = true;

                var $img = $('<img class="groupImg" />'),
                    that = this,
                    image = {
                        id: new Date() * 1,
                        url: url.url,
                        closeButtonRequire: url.closeButtonRequire,
                        clickToSelect: url.clickToSelect,
                        onClick: url.onClick,
                        img: null,
                        $imgWrapper: null,
                        $removeIcon: null,
                        order: this.images.length + 1,
                        height: 0,
                        width: 0,
                        centerPoint: {x: 0, y: 0},
                        transform: {
                            translate: {x: 0, y: 0},
                            rotation: 0,
                            scale: 1
                        }
                    };

                this.images.push(image);

                $img.on('load', function() {

                    image.$imgWrapper = $('<span class="userSpan">').append($(this));
                    
                    image.img = this;
                    that._placeImage(image);

                    var loaded = 0;
                    that.images.forEach(function(im) {
                        if(im.img)
                            loaded ++;
                    });

                    if(loaded == that.images.length) { // all images loaded
                        if(!that.inited) {
                            that.inited = true;
                            that.options.onInitCompleted && that.options.onInitCompleted();
                        } else {
                            select && that.selectImage(that.images.length - 1); // select the top image
                        }

                        that.options.onImagesLoaded && that.options.onImagesLoaded();
                    }
                });

                $img.attr('src', url.url);
            },

            setImage: function(url, index, select, callback) {
                if(index > this.images.length - 1)
                    return;

                url = this._preProcessImageUrl(url);

                var image = this.images[index],
                    $img = $('<img>'),
                    that = this;

                $img.on('load', function() {
                    image.$imgWrapper.remove();

                    image = {
                        id: new Date() * 1,
                        url: url.url,
                        closeButtonRequire: url.closeButtonRequire,
                        clickToSelect: url.clickToSelect,
                        onClick: callback || null,
                        img: this,
                        $imgWrapper: null,
                        $removeIcon: null,
                        order: index + 1,
                        height: 0,
                        width: 0,
                        centerPoint: {x: 0, y: 0},
                        transform: {
                            translate: {x: 0, y: 0},
                            rotation: 0,
                            scale: 1
                        }
                    };

                    image.$imgWrapper = $('<span>').append($(this));
                    that.images[index] = image;
                    that._placeImage(image);

                    select && that.selectImage(index);
                });

                $img.attr('src', url.url);
            },

            removeImage: function(index) {
                var targetImage;

                if(typeof index == 'object') {
                    targetImage = this.images.filter(function(image) {
                        return image.id == index.id;
                    })[0];

                    if(targetImage)
                        index = targetImage.order - 1;
                    else
                    // throw new Error('cannot remove an image that not exists');
                        return;
                }

                this.images = this.images.filter(function(image, i) {
                    var keep = true;

                    if(index == i) {
                        keep = false;
                        if(this.options.removeImageAnimation)
                            image.$imgWrapper.fadeOut('fast', function() {
                                image.$imgWrapper.remove();
                            });
                        else
                            image.$imgWrapper.remove();
                    }

                    if(i > index)
                        image.order --;

                    return keep;
                }.bind(this));
            },

            removeAll: function() {
                for(var i = this.images.length - 1; i >= 0; i --)
                    this.removeImage(i)
            },

            reset: function() {
                this.removeAll();
                this.options.imageUrls.forEach(function(url) {
                    this.addImage(url, false);
                }.bind(this));
            },

            selectImage: function(index) {
                var targetImage;

                if(typeof index == 'object') {
                    targetImage = this.images.filter(function(image) {
                        return image.id == index.id;
                    })[0];

                    if(targetImage)
                        index = targetImage.order - 1;
                    else
                    // throw new Error('cant select an image that not exists');
                        return;
                }

                this.activeImage = this.images[index];

                this.images.forEach(function(image, i) {
                    if(index == i)
                    //image.$mask.css('background', 'rgba(0,0,0,0.3)')
                        image.$mask.css('background', 'rgba(0,0,0,0)');
                    else
                        image.$mask.css('background', 'rgba(0,0,0,0)');
                });
            },

            mergeImage: function() {
                var cvs = document.createElement('canvas'),
                    ctx = cvs.getContext('2d'),
                    that = this;

                cvs.width = this.options.width;
                cvs.height = this.options.height;
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0,0,cvs.width,cvs.height);
                ctx.fill();

                this.images.forEach(function(image) {
                    that._drawImage(image, ctx);
                });

                return cvs.toDataURL('jpeg',1);
            }

        };

        return new ImageEditor(this, options);
    }

})($, window, Hammer);


// function editImage(obj,base64,index){
//
//     var obj = obj;
//     obj.empty();
//     var options = {
//         imageUrls: [
//             {url: base64, closeButtonRequire: false}
//         ],
//         closeButtonRequire:false,
//         removeIcon:false,
//         removeIconSize:0,
//         width: 500,
//         height: 400,
//         onInitCompleted: function(e) {
//             editor.selectImage(0);
//         }
//     };
//     window.editor = obj.ImageEditor(options);
//     // console.log(editor);
//
//     // 合成
//     editor.merge();
// }