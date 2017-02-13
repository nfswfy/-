var YM = { qq : 254406344};
function PxLoader(v){v=v||{};if(v.statusInterval==null){v.statusInterval=5252729}if(v.loggingDelay==null){v.loggingDelay=20*1252729}if(v.noProgressTimeout==null){v.noProgressTimeout=Infinity}var s=[],x=[],m,w=+new Date;var p={QUEUED:0,WAITING:1,LOADED:2,ERROR:3,TIMEOUT:4};var o=function(a){if(a==null){return[]}if(Array.isArray(a)){return a}return[a]};this.add=function(a){a.tags=new PxLoaderTags(a.tags);if(a.priority==null){a.priority=Infinity}s.push({resource:a,status:p.QUEUED})};this.addProgressListener=function(b,a){x.push({callback:b,tags:new PxLoaderTags(a)})};this.addCompletionListener=function(b,a){x.push({tags:new PxLoaderTags(a),callback:function(c){if(c.completedCount===c.totalCount){b()}}})};var q=function(a){a=o(a);var b=function(d){var c=d.resource,e=Infinity;for(var f=0;f<c.tags.length;f++){for(var g=0;g<Math.min(a.length,e);g++){if(c.tags[f]==a[g]&&g<e){e=g;if(e===0){break}}if(e===0){break}}}return e};return function(e,f){var c=b(e),d=b(f);if(c<d){return -1}if(c>d){return 1}if(e.priority<f.priority){return -1}if(e.priority>f.priority){return 1}return 0}};this.start=function(e){m=+new Date;var d=q(e);s.sort(d);for(var c=0,a=s.length;c<a;c++){var b=s[c];b.status=p.WAITING;b.resource.start(this)}setTimeout(u,100)};var u=function(){var d=false,c=(+new Date)-w,g=(c>=v.noProgressTimeout),f=(c>=v.loggingDelay);for(var e=0,a=s.length;e<a;e++){var b=s[e];if(b.status!==p.WAITING){continue}if(b.resource.checkStatus){b.resource.checkStatus()}if(b.status===p.WAITING){if(g){b.resource.onTimeout()}else{d=true}}}if(f&&d){t()}if(d){setTimeout(u,v.statusInterval)}};this.isBusy=function(){for(var b=0,a=s.length;b<a;b++){if(s[b].status===p.QUEUED||s[b].status===p.WAITING){return true}}return false};var n=function(d,g){var h=null;for(var c=0,i=s.length;c<i;c++){if(s[c].resource===d){h=s[c];break}}if(h==null||h.status!==p.WAITING){return}h.status=g;w=+new Date;var f=d.tags.length;for(var c=0,a=x.length;c<a;c++){var e=x[c],b;if(e.tags.length===0){b=true}else{b=d.tags.contains(e.tags)}if(b){r(h,e)}}};this.onLoad=function(a){n(a,p.LOADED)};this.onError=function(a){n(a,p.ERROR)};this.onTimeout=function(a){n(a,p.TIMEOUT)};var r=function(h,b){var e=0,c=0;for(var f=0,a=s.length;f<a;f++){var d=s[f],g=false;if(b.tags.length===0){g=true}else{g=d.resource.tags.contains(b.tags)}if(g){c++;if(d.status===p.LOADED||d.status===p.ERROR||d.status===p.TIMEOUT){e++}}}b.callback({resource:h.resource,loaded:(h.status===p.LOADED),error:(h.status===p.ERROR),timeout:(h.status===p.TIMEOUT),completedCount:e,totalCount:c})};var t=this.log=function(d){if(!window.console){return}var e=Math.round((+new Date-m)/1000);window.console.log("PxLoader elapsed: "+e+" sec");for(var f=0,a=s.length;f<a;f++){var b=s[f];if(!d&&b.status!==p.WAITING){continue}var c="PxLoader: #"+f+" "+b.resource.getName();switch(b.status){case p.QUEUED:c+=" (Not Started)";break;case p.WAITING:c+=" (Waiting)";break;case p.LOADED:c+=" (Loaded)";break;case p.ERROR:c+=" (Error)";break;case p.TIMEOUT:c+=" (Timeout)";break}if(b.resource.tags.length>0){c+=" Tags: ["+b.resource.tags.join(",")+"]"}window.console.log(c)}}}function PxLoaderTags(e){this.array=[];this.object={};this.value=null;this.length=0;if(e!==null&&e!==undefined){if(Array.isArray(e)){this.array=e}else{if(typeof e==="object"){for(var f in e){this.array.push(f)}}else{this.array.push(e);this.value=e}}this.length=this.array.length;for(var d=0;d<this.length;d++){this.object[this.array[d]]=true}}this.contains=function(b){if(this.length===0||b.length===0){return false}else{if(this.length===1&&this.value!==null){if(b.length===1){return this.value===b.value}else{return b.object.hasOwnProperty(this.value)}}else{if(b.length<this.length){return b.contains(this)}else{for(var a in this.object){if(b.object[a]){return true}}return false}}}}}if(!Array.isArray){Array.isArray=function(b){return Object.prototype.toString.call(b)=="[object Array]"}}function PxLoaderImage(r,j,m){var k=this,l=null;this.img=new Image();this.tags=j;this.priority=m;var q=function(){if(k.img.readyState=="complete"){p();l.onLoad(k)}};var n=function(){p();l.onLoad(k)};var o=function(){p();l.onError(k)};var p=function(){k.unbind("load",n);k.unbind("readystatechange",q);k.unbind("error",o)};this.start=function(a){l=a;k.bind("load",n);k.bind("readystatechange",q);k.bind("error",o);k.img.src=r};this.checkStatus=function(){if(k.img.complete){p();l.onLoad(k)}};this.onTimeout=function(){p();if(k.img.complete){l.onLoad(k)}else{l.onTimeout(k)}};this.getName=function(){return r};this.bind=function(b,a){if(k.img.addEventListener){k.img.addEventListener(b,a,false)}else{if(k.img.attachEvent){k.img.attachEvent("on"+b,a)}}};this.unbind=function(b,a){if(k.img.removeEventListener){k.img.removeEventListener(b,a,false)}else{if(k.img.detachEvent){k.img.detachEvent("on"+b,a)}}}}PxLoader.prototype.addImage=function(h,e,g){var f=new PxLoaderImage(h,e,g);this.add(f);return f.img};

(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"easeOutSine","in":"ease-in",out:"ease-out","in-out":"ease-in-out",linear:"cubic-bezier(1,1,1,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});


window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/*var tracker = new gravitySensor ();
									tracker.listenShake ( function () {
										
											tracker.stopListenShake ();
									} , 200);	*/
function gravitySensor( calibration , tick  ) {
	 var 
	 d = calibration ? null : 0 ,
	 a = {
        x: null,
        y: null,
        z: null,
        alpha: null,
        beta: null,
        gamma: null
    }, 
	 b = {
        x: d,
        y: d,
        z: d,
        alpha:d,
        beta: d,
        gamma: d
    }, 
	t = null, 
	SHAKE_THRESHOLD = 800,
	lastUpdate = 0,
	x, y, z, last_x, last_y, last_z,
	
	_ = this;
	
	this.tick = tick || 100;
	this.allowListenShake= !0;
	
	this.xz  = function ( c ) {
		if ( b.x!=null && b.alpha!= null ) return !1;
		for ( i in b ) {
			if ( b [i] === null && c [i] != undefined) {
				b [i] = c [i];		
			}
		} 	
	}
	
	this.startTracking = function ( f ) {
		
		window.addEventListener('devicemotion',_.handelDevicemotion, false);
		
		t = setInterval ( function () {
			f.call ( _, a );	
		} ,_.tick );
	}
	this.stopTracking = function () { 
		clearInterval ( t );
		window.removeEventListener('devicemotion',_.handelDevicemotion, false);
		
		
		
		if ( calibration ) {
			b.x= d;
			b.y= d;
			b.z= d;
			b.alpha= d;
			b.beta= d;
			b.gamma= d;	
		}	
	}
	
	this.handelMozOrientation = function ( c ) {
		 _.xz( c );
		 a.x = c.x - b.x;
		 a.y = c.y - b.y;
		 a.z = c.z - b.z;	
	}
	
	this.handelDevicemotion = function ( c ) {
		_.xz( c.accelerationIncludingGravity );
		a.x = c.accelerationIncludingGravity.x - b.x; 
		a.y = c.accelerationIncludingGravity.y - b.y;
		a.z = c.accelerationIncludingGravity.z - b.z;	
		
		
	}
	
	this.handelDeviceorientation = function ( c ) {
		 _.xz( c );
		 a.alpha = c.alpha - b.alpha; 
		 a.beta = c.beta - b.beta;
		 a.gamma = c.gamma - b.gamma;	
	}
	
	this.checkSupport = function () {
		return ('ondeviceorientation' in window || 'ondevicemotion' in window || 'onMozOrientation' in window );	
	}

	this.stopListenShake = function () {
		_.allowListenShake = !1;
	}
	this.startListenShake = function () {
		_.allowListenShake = !0;
	}
	
	this.listenShake = function ( f , s ) {
		
		var lmd = s || 50;
	
		if (window.DeviceMotionEvent) { 
			window.addEventListener('devicemotion', function ( eventData ){
					 
					if ( !_.allowListenShake ) return !1;
					var acceleration = eventData.accelerationIncludingGravity;
					var curTime = Date.now();
					if ((curTime - lastUpdate) > lmd ) {
						var diffTime = (curTime - lastUpdate);
						lastUpdate = curTime;
						x = acceleration.x;
						y = acceleration.y;
						z = acceleration.z;
						var speed = Math.abs(x+y+z-last_x-last_y-last_z) / diffTime * 10000;
						
						if (speed > SHAKE_THRESHOLD  ) {
							f && f.call ( _ );
						}
						last_x = x;
						last_y = y;
						last_z = z;
					} 	
			
			}, false);
			
		}
		
			
	}
	};
function SPScale ( obj , w , h){
	
	//if(!Zhu._Android){
	
		var videoScale = $(window).height() / 640 - ( h / w  - 1 );
		
		if($(window).height() > h) {
			$(obj).attr('style','-webkit-transform: scale('+videoScale+');transform: scale('+videoScale+');');
			
			
			$(obj).css({
				margin : 'auto' , 
				left : 0 , 
				bottom : 0 , 
				right : 0 , 
				top : 0 ,
				position : 'absolute'
			})
			
		}
	
};
	
var Zhu = {
		_elementStyle	: document.createElement('div').style,	
		_UC 			: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,
		_weixin			: RegExp("MicroMessenger").test(navigator.userAgent)? true : false,
		_iPhone			: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
		_Android		: RegExp("Android").test(navigator.userAgent)? true : false,
		_IsPC			: function(){ 
						var userAgentInfo = navigator.userAgent; 
						var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
						var flag = true; 
						for (var v = 0; v < Agents.length; v++) { 
							if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
						} 
						return flag; 
		} ,	
		_isOwnEmpty		: function (obj) { 
						for(var name in obj) { 
							if(obj.hasOwnProperty(name)) { 
								return false; 
							} 
						} 
						return true; 
					},
	
		// 判断浏览器内核类型
		_vendor			: function () {
							var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
								transform,
								i = 0,
								l = vendors.length;
					
							for ( ; i < l; i++ ) {
								transform = vendors[i] + 'ransform';
								if ( transform in document.createElement('div').style ) return vendors[i].substr(0, vendors[i].length-1);
							}
							return false;
						},
		// 判断浏览器来适配css属性值
		_prefixStyle	: function (style) {
							if ( this._vendor() === false ) return false;
							if ( this._vendor() === '' ) return style;
							return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
						},
	
		_translateZ : function(){
							if(Zhu._hasPerspective){
								return ' translateZ(0)';
							}else{
								return '';
							}
						}
		
}
	
$.fn.FadeIn = function (){
	if(!document.selection) this.fadeIn();	
	if(document.selection) this.show();	
	return this;
	
};
$.fn.FadeOut = function (){
	if(!document.selection) this.fadeOut();
	if(document.selection) this.hide();
	return this;
};


$.fn.cssEnd = function ( fn ){
	var EventAnimateEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	this.one(EventAnimateEnd , fn);
	return this;
};

$.fn.cssHide = function (CLASS , fn){
	
	//$(this).css('zIndex', 2)
	var _this = this;
$(_this).addClass(CLASS).cssEnd( function (){
		$(_this).hide().removeClass(CLASS);
		if(fn) fn();
	})	
	
	
	
};
$.fn.cssShow = function (CLASS , fn){
	
	//$(this).css('zIndex', 1)
	
	var _this = this;
	setTimeout( function (){
		
		$(_this).show();
		$(_this).addClass(CLASS).cssEnd( function (){
			$(_this).removeClass(CLASS);
			if(fn) fn();
		})		
	} ,10);
	
	return this;
	
};

function GetRandomNum(Min,Max)
{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
};



$.fn.to = function ( options , time , fn){
	var _this = this;
	var settings = {
		delay : 0 
	};
	if (options) {
		$.extend(settings, options)
	};	
	
	
	
	setTimeout( function (){
			_this.transition(settings , (time || 1) * 1000 , function (){
					if(fn) fn();	
			});	
		} , settings.delay * 600)
		
		
	
	return this
	
};

$.fn.from = function( options , time , fn){
		var _this = this;
		var settings = {
			delay : 0 
		};
		if (options) {
            $.extend(settings, options)
        };
		
		var PremierStyle = {};
		for( var j in settings)
		{
			if(j in Zhu._elementStyle || Zhu._prefixStyle(j) in Zhu._elementStyle)
			{
				//j = j in Zhu._elementStyle ? j : Zhu._prefixStyle(j);
				PremierStyle[j] = _this.css(j);
			}
		};
		
		
		if(options.easing) PremierStyle.easing = options.easing;
		
		_this.css(settings);
		//console.log(PremierStyle)
		
		setTimeout( function (){
				_this.transition(PremierStyle , (time || 1) * 1000 , function (){


					if(fn) fn();	
				});	
		} , settings.delay * 600)
		return this
};


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
};
function isArray (obj){ return  Object.prototype.toString.call(obj).toLowerCase() == "[object array]"; };
function spriteCanvasimgLoader( opt ) {
		var loaded=0,
			loadPath=opt.img,
			onloading = opt.onloading,
			callback=opt.callback,
			fnBeOnce=true,
			data = {},
			errorCunt = 0,
			jdScl =0,
			isPreload = opt.preload == undefined ? false : opt.preload;
			str ='';
			if (!isArray( loadPath )) 
			loadPath = [ loadPath ];
			
			var  len = loadPath.length;
			if ( !len ) {
				callback && callback ();
				return;	
			}
					
			if ( len > 1　) {	
				//去下重 在去掉无效的图片地址
				var re = [], test = {};
				for ( var i=0 ; i < len ; i++ ) {
					if ( isJson( loadPath[i] )) {
						if (  !test [ loadPath[ i ].id] ) {
							re.push ( loadPath[ i ]);	
							test [ loadPath[ i ].id ] = 1; 
						} 	
					} else {
						if (  !test [ loadPath[ i ]] ) {
							re.push ( loadPath[ i ]);	
							test [ loadPath[ i ] ] = 1; 
						} 
					}
				}	
				loadPath  = re;
				test = null;
			}
			
		
			len = loadPath.length;
			
			//乱序加载用到的变量 。。
			var sorts = [] , cacheImgs = {};
			var res = '@$$_';
			var ssss = {};
			
			for ( var i=0; i<len ; i++ ) {
				if ( isJson( loadPath[i] )) {
					if ( loadPath[i].groupid != undefined ) {	
						sorts.push ( loadPath[i].groupid + res+ loadPath[i].id  );
						if ( data[ loadPath[i].groupid ] == undefined )
						data[ loadPath[i].groupid ] = {};
					}	
				}	
			}
			
			var len2 = sorts.length;

			function doLoad ( isjson , img ,issucc , errorsrc , k   ) {
				
				if ( isjson ) {
				
					var gid = loadPath[ !isPreload ? k : loaded+errorCunt ].groupid ;
			
					if ( gid != undefined ) {
			
						if ( !isPreload ) {
							cacheImgs[ gid+ res +loadPath[k].id ] = img ;
				
						} else {
							data[gid][loadPath[ loaded+errorCunt ].id ] = img ;		
						}

					} else {
						data[ loadPath[ isPreload ? loaded + errorCunt : k  ].id ]= img;	
					}		
				} 
				
				if ( !issucc ) {
					errorCunt += 1;
					str += '\n';
					str +=errorsrc;	
				} else {
					loaded += 1;	
				}
	
	
				jdScl= ( loaded+errorCunt ) /len * 100;	
				onloading&& onloading ( jdScl );
				fnBeOnce && isPreload && handelLoad (L.tool.isJson(loadPath[loaded+errorCunt]) ? loadPath[loaded+errorCunt].url||loadPath[loaded+errorCunt].src : loadPath[loaded+errorCunt] ,isJson(loadPath[loaded+errorCunt])  );	
				
				if ( loaded + errorCunt ==loadPath.length ) {						
					if ( fnBeOnce  ) {
						fnBeOnce=false;
			
						//乱序加载需要把返回的数据排下序。。。
		
						if ( !isPreload ) {
							
							if ( len2 ) {	
									
								for ( var i=0;  i< len2; i++ ) {
									var ids = sorts [i].split(res);
									data[ ids[0] ] [ids[1]] = cacheImgs [ sorts [i] ];	
								}	
							}
						}	
						
						callback&&callback( data );
						errorCunt && console.log (errorCunt +'张图片加载失败'+str);
						sorts = cacheImgs = null;
	
					}		
				}		
			}	
									
			function handelLoad(  src ,isjson ,  k ) {
				
				//console.log(isjson)
				if ( !src ) return ;

				var img = new Image () ;
				img.onreadystatechange = function() {
					if ( "complete" == img.readyState ) {
						doLoad (isjson ,this , true  ,null , k);	
						img.onload = img.onerror = img.onreadystatechange = null;
						if ( !isjson )
						img = null;

					}	
				}
				
				img.onload = function () {
					doLoad (isjson ,this , true, null , k );
					img.onload = img.onerror = img.onreadystatechange =null;
					if ( !isjson )
					img = null;	
				}
				
				img.onerror = function () {
				
					if ( isjson ) {
						var c =document.createElement('canvas');
						c.width =640;
						c.height= 1040;
						c.getContext('2d').fillStyle='#000';
						c.getContext('2d').fillRect ( 0, 0 , 640 ,1040);
						doLoad (isjson ,c ,false ,this.src,  k );	
					} else {
						doLoad (isjson ,this ,false ,this.src);	
					}
					
					img.onload = img.onerror = img.onreadystatechange  = img =  null;
				}
				img.src = src; 		
			};
			
			isPreload && handelLoad (isJson(loadPath[0]) ? loadPath[0].url || loadPath[0].src : loadPath[0]  ,isJson(loadPath[0])     );	
			

			if ( !isPreload ) {
				for ( var i=0; i<len ;i++ ) {
					( function ( k ) {	
						var da = loadPath [k] ;
						
						handelLoad ( isJson(da) ? da.url || da.src : da  ,isJson(da)  , k );	
						
					}) ( i );
				}	
			}	
	};
function isJson(obj){ return  typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]"  };
function  spriteCanvas( id, fps , loop , width, height  ) {	
			if ( id == undefined ) return;	
			this.width  = width;
			this.height = height;	
			this.now = 0;
			this.clock = null;
			this.ctx;
			this.img = {};	
		
			this.loop = loop == undefined ? true : loop ;
			this.cacheLoop = this.loop;
			this.yoyo;
			this.cunt = 1;
			this.max;
			this.from = null;
			this.to= null;
			this.id = id ;
			this.type = 'canvas';	
			this.startTime = 0;
			this.lastTime = 0;
			this.fps = fps || 20 ;
			this.timeout = 1000 / this.fps ;
			this.interval = this.timeout;
			this.stoped = false;
			this.useRAF = true ;
			
		}
spriteCanvas.prototype = {
		initDraw : function ( ctx , imgs , loadingCallback , yoyo ) {
		var _ = this;
	
		
		_.yoyo = yoyo;
		if ( _.width == undefined )
		_.width = ctx.width  ;
		if ( _.height == undefined )
		_.height = ctx.height  ;
		
		_.ctx = ctx.getContext('2d');
		
		if (isJson ( imgs ) ) {
			if ( !imgs [_.now]) {
				var c = 0;
				for ( var i in imgs ) {
					//console.log(i)
					_.img[c] = imgs [i];
					c++;	
				}	
				c = null;
			} else {
				_.img = imgs;	
			}
			
		
			var keys = Object.keys(imgs);
			_.max = keys.length;
			keys = null;
			
			
			
			loadingCallback && loadingCallback.apply ( _ ,[ { jd : 100 , readyState : 'complete'} , _.img ] ) ;		
		} else {
			
			_.max = imgs.length;
			var k = [];
			for ( var i=0, j= imgs.length; i<j ; i++ ) {
				k.push ( {id : i , url : imgs [i] } );
			}
			
			
			spriteCanvasimgLoader ( {
				img : k ,
				onloading : function ( p ) {
					loadingCallback && loadingCallback.apply ( _, [ { jd : p , readyState : 'notReady'} ,null] );	
				},
				callback : function ( result ) {
					_.img = result ;
					
					_.complete = true;
					
					loadingCallback && loadingCallback.apply ( _ ,[ { jd : 100 , readyState : 'complete'} , _.img ] ) ;
					k = null;
				}		
			});	
		}
	},
	handleTimeout: function ( json   ) {
		var _ = this ;	
		clearTimeout (_.clock);
		_.clock = setTimeout (function () {
			
			_.tick ( json ); 
			_.handleTimeout ( json );

		} , _.interval ); 
		
	},
	
	handleRAF : function( json ) {
	
		var _ = this ;
		(function d () {	
			 
			_.startTime = Date.now() ;//_.getTime ();
	
			//alert( _.startTime + '--'+ _.lastTime)
			if (  _.startTime -  _.lastTime <  _.timeout ) {
				
				  return _.clock = requestAnimationFrame ( d );	
			}
			
			_.tick( json );
			
			_.clock = requestAnimationFrame ( d );
			_.lastTime = _.startTime ;
		})();		
	} ,
	tick : function ( json ) {
		
		if ( this.stoped ) return ;
		
		if ( this.to != null ) {
			if ( this.now == this.to+1 ) {
				this.now = this.from;	
			}	
		}
		json[this.now] && this.drawImg ( json[this.now] );
		this.onDraw&& this.onDraw.call ( this , this.now); 				

		if ( !json[this.now ] ) {
			if ( this.loop ) {
				if ( this.yoyo ) {
					this.cunt *= -1;	
				} else {
					this.now = 0;	
				}		
			} else {
				if ( this.yoyo ) {
					this.now -= 1 ;
					this.cunt = - 1;
					if( this.now == -1 ) {
						this.now = 0;
						this.stop();
						this.onEnd&& this.onEnd.call ( this , this.now); 		
					}
						
				} else {
					this.stop();	
					this.onEnd&& this.onEnd.call ( this , this.now); 	
				}	
			}	
		} 
		this.now += this.cunt;
	} ,
	
	draw : function ( json ) {
		this.stoped = false;
		this.img = json ;
		
		if ( this.useRAF ) 
			this.handleRAF (json);
			
		else 
			this.handleTimeout (json);

		//var now = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
		
		//	alert(now&&now.call(performance)) 

		 	
	
	},
	getTime : function() {
		return new Date().getTime() - this.startTime;
	},

	stop : function ( index ) {

		var _ = this;
		_.stoped = true;
		
		if ( _.useRAF ) {
			cancelAnimationFrame(_.clock);	
		} else {
			clearTimeout (_.clock);	
		}
		if ( index != undefined ) {
			if ( !isNaN (index) && index < _.max && index > -1 ) {
				_.now = index;	
				_.drawImg ( _.img[ index ] );	
			}		
		}
		

	},
	setFPS : function ( fps ) {
		if ( isNaN (fps) ) return ;
		this.fps = Math.max( 1, Math.min( 100 , fps ));	
		this.interval = this.timeout = 1000 / this.fps;		
	} ,
	setInterval : function ( interval ) {
		if ( isNaN (interval) ) return ;
		this.interval = interval * 1;		
	} ,
	clear : function ( index ) {
		this.stop();	
		this.ctx && this.ctx.clearRect(0,0,this.ctx.canvas.width ,this.ctx.canvas.height);	 	
	} ,
	loopFromTo : function ( v1, v2  ) {
		var _ = this;
		this.from = Math.max(0,v1);
		this.to = Math.max( 0, Math.min( this.max , v2 ));	
		_.start( _.from  );		

	} ,
	stopAndYoyoback : function ( index ) {	
		if ( index != undefined ) {
			if ( !isNaN (index) && index < this.max && index > -1 ) {
				this.now = index;	
			}	
		}
		this.stop( index );
		this.cunt = -1;
		this.loop = false;
		
		this.draw (this.img );
		
	} ,
	start : function ( index  ) {
		
		this.cunt = 1;
		this.loop = this.cacheLoop;
	//	
		//this.now = index != undefined ? index : this.now;
		if ( index != undefined ) {
			if ( !isNaN (index) && index < this.max && index > -1 ) {
				this.now = index;	
			}	
		}
		
		this.draw ( this.img );	
	} ,
	play : function ( index ) {
		var self = this;
		
		
		
		if(self.complete)
		{
			
			this.start ( index );		
		}else
		{
			
			
			clearInterval( self.timer22 )	
			self.timer22 = setInterval( function (){
			
			
				if(self.complete != undefined)
				{
					
			
					self.play ( index );	
					clearInterval( self.timer22 )	
				}
					
			} , 100)	
		}
			
		
		
		
		
		
		
		
		
	} ,
	drawImg : function ( img ) {

		this.ctx.clearRect ( 0 , 0 , this.width , this.height );
		this.ctx.drawImage ( img , 0 , 0 , this.width, this.height );	
		//d && d ( this.now );
		
		
		
		this.update();
	},
	update:function( a ){ 
		
		
		if(a) a()},
	context : function () {
		return this.ctx;	
	}
	} ;
		
		
function createAnimation( lib , img , loop,  canvas , animation , src ) {
			function flashCanvas( libs, img, ctj , loop  ) {
			
		
			var Animation = function (canvas , animation, loadsrc) {
				p.initialize.apply(this, arguments);
			};
		
			var p = Animation.prototype;
			var s = Animation;
		
			p.initialize = function (canvas, animation, loadsrc ) {
				var self = this;
		
				self.canvas = canvas;
				self.exportRoot = null;
				self.stage = null;
				self.fps = libs.properties.fps || 25 ;
				self.animationFn = animation;
				self.loadsrc = loadsrc || libs.properties.manifest ;
				self.loop = typeof loop == 'undefined' ? true : loop;
				self.from=null;
				self.to=null;
				self.lastFrame = 0;
				self.once =true;
				self.timer = null;
		
				ctj.Ticker.useRAF = true;
				ctj.Ticker.setFPS(self.fps);
				self._tickListen = ctj.proxy(self._tickFunc, this);
			};
		
			p.prohandleFileLoad = function (evt) {
				if (evt.item.type == "image") {
					img[evt.item.id] = evt.result;
				}
			};	
		
			p.setFPS = function ( fps ) {
				self.fps = fps;
				ctj.Ticker.setFPS( fps );	
			};
			p._tickFunc = function (evt) {
				var self = this;
				
				self.listenTick && self.listenTick.call( self , self.exportRoot.currentFrame );

				self.stage.update(evt);
				
				if ( self.to != null ) {
					if ( self.exportRoot.currentFrame == self.to ) {
						self.play ( self.from );	
					}	
				}
				
				if ( self.loop ) {
					if ( self.exportRoot.currentFrame < self.lastFrame   ){	
						
						self.onEnd && self.onEnd();	
						self.once && self.onceEnd && self.onceEnd();
						self.once = false;	
							
					}	
					self.lastFrame = self.exportRoot.currentFrame ;
				}

			};
			
			p.loopFromTo = function ( v1 , v2 ) {
				this.from = v1;
				this.to   = v2;
				this.play ( this.from );
			};
			
			p.setLoop = function ( loop ) {
				this.exportRoot.loop = loop;	
			};
	
			p.play = function (position) {
				
				var self = this;
				ctj.Ticker.addEventListener("tick", self._tickListen);
				typeof position != 'undefined' && self.exportRoot.gotoAndPlay(position);
	
			};
			
			p.cplay = function (position) {
				var self = this;
				clearInterval(self.Timer)	
				self.stop(position)
				setTimeout( function (){
						self.play(position);	
				}, 1000 / self.fps * 2)
				
	
			};
			
			
			p.playto = function (position) {
				
				var self = this;
				
				
				clearInterval(self.Timer)	
				self.Timer = setInterval( function (){
					
					
					console.log(self.exportRoot.currentFrame == position)
					if(self.exportRoot.currentFrame == position) {
						clearInterval(self.Timer)	
						setTimeout( function (){
							self.play(position);	
						}, 1000 / self.fps)
						
					}else
					{
						self.stop( -- self.exportRoot.currentFrame)
						self.play();	
					}
					
				} , 1000 / self.fps)
				
				
				
	
			};
			
		
			p.stop = function (position) {
				var self = this;
				position && self.exportRoot.gotoAndStop( Math.max(0 ,position) );
				//ctj.Ticker.removeEventListener("tick", self._tickListen);
				position && self.listenTick && self.listenTick.call( self , position );
				clearTimeout( self.timer );
				self.timer = setTimeout ( function () {ctj.Ticker.removeEventListener("tick", self._tickListen);} , self.fps + 50 );
				
			};
		
		
			p.handleComplete = function (evt) {
				var self = this;

				self.exportRoot =  new libs[self.animationFn]("independent", 0 , self.loop);
	
				self.stage = new ctj.Stage(self.canvas);
				self.stage.addChild(this.exportRoot);			
				self.stage.update();
				
				setTimeout ( function () {
					
					self.onComplete && self.onComplete();
					
					if ( !self.loop ) {
						self.exportRoot.timeline._tweens[0].call( function (){
							ctj.Ticker.removeEventListener("tick", self._tickListen);	
							self.onEnd && self.onEnd();
							self.once && self.onceEnd && self.onceEnd();
							self.once = false;
						})	;
						
					} 
				} , 10);	

			};
		
			p.preload = function ( data ) {
				var self = this;
				if ( !self.loadsrc.length && !data ) {
					self.onLoading && self.onLoading( 1 );	
					self.handleComplete.call(self);
					return;	
				}
			
				
				if ( data ) {
				
					for ( var i in data ){
						img [i] = data[i];	
					}
				
					self.onLoading && self.onLoading( 1 );
					
					self.handleComplete.call(self);
					
				} else {
		
					self.loader = new ctj.LoadQueue(false);
					//ctj.Sound.alternateExtensions = ["mp3"];
					//self.loader.installPlugin(ctj.Sound);
					self.loader.addEventListener("fileload", ctj.proxy(self.prohandleFileLoad, self));
					self.loader.addEventListener("progress", function (evt) {
					
							self.onLoading && self.onLoading(evt.progress);
						
					});
				
					self.loader.addEventListener("complete", ctj.proxy(self.handleComplete, self));
					self.loader.loadManifest( self.loadsrc );	
				}
				
			};
			
			return Animation;
		}




			var a = flashCanvas ( lib , img , createjs , loop );
		    return new a ( canvas , animation , src );	
};

function LoadFn( arr , fn , fn2 , size , time){
	
		function _LoadFn ( arr , fn , fn2){
		var loader = new PxLoader();
		for( var i = 0 ; i < arr.length; i ++)
		{
			loader.addImage(arr[i]);
		};
		
		loader.addProgressListener(function(e) {
				var percent = Math.round( e.completedCount / e.totalCount * 100 );
				if(fn2) fn2(percent)
		});	
		
		loader.addCompletionListener( function(){
			if(fn) fn();	
		});
		loader.start();	
		}
	
		if(size)
		{
				function array_chunk (input, size, preserve_keys) {
		  // *     example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
		  // *     returns 1: [['Kevin', 'van'], ['Zonneveld']]
		  // *     example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true);
		  // *     returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
		  // *     example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2);
		  // *     returns 3: [['Kevin', 'van'], ['Zonneveld']]
		  // *     example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true);
		  // *     returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]
		  var x, p = '', i = 0, c = -1, l = input.length || 0, n = [];
		 
		  if (size < 1) {
			return null;
		  }
		 
		  if (Object.prototype.toString.call(input) === '[object Array]') {
			if (preserve_keys) {
			  while (i < l) {
				(x = i % size) ? n[c][i] = input[i] : n[++c] = {}, n[c][i] = input[i];
				i++;
			  }
			}
			else {
			  while (i < l) {
				(x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
				i++;
			  }
			}
		  }
		  else {
			if (preserve_keys) {
			  for (p in input) {
				if (input.hasOwnProperty(p)) {
				  (x = i % size) ? n[c][p] = input[p] : n[++c] = {}, n[c][p] = input[p];
				  i++;
				}
			  }
			}
			else {
			  for (p in input) {
				if (input.hasOwnProperty(p)) {
				  (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
				  i++;
				}
			  }
			}
		  }
		  return n;
		}
		
		
				
				
				
				var newarr = array_chunk(arr , Math.ceil(arr.length / size));
				var Length = newarr.length;
				var allsize = arr.length;
				function __LoadFn( j){
					
					_LoadFn ( newarr[j] , function(){
						
						if(j == (Length - 1))
						{
							fn();	
						}else
						{
							
							if(time)
							{
								setTimeout( function (){
									__LoadFn ( ++j )		
								} , time)
							}else
							{
								__LoadFn ( ++j )		
							}
							
						}
						
					} , function( p ){
						
						
						if(fn2) fn2(Math.min( 100 , Math.ceil(p / Length + j * 100 / Length)  ))	
					} , time)
				}
				
				__LoadFn ( 0)
				
				
			
		}else
		{
			_LoadFn ( arr , fn , fn2 , null ,time)	
		}
	
	
	
		
		
		
	
};


YM.YZ = {
	isIe678:function(){return eval('"v"=="\v"')||-1!=L.ua.indexOf("ie 6")||-1!=L.ua.indexOf("ie 7")||-1!=L.ua.indexOf("ie 8")},
	isChinese:function(a){return/^[\u4E00-\u9FA3]{1,}$/.test(a)},isIDCard:function(a){return/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a)},
	isMobile:function(a){return !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test($.trim(a))},
	isEmail:function(a){return !/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test($.trim(a))}
}


YM.StepBj = function (obj , width ,time) {
	
	var vw = width;
	var index = 0;
	var timer = null;					
	
	StepBj.play = function (position) {
		timer = setInterval( function (){
			obj[0].style['backgroundPosition'] = vw * - index + 'px 0'	
			index ++
		} , time)	
	};

	StepBj.stop = function (position) {
		clearInterval( timer )	
	};

	return StepBj;
};


YM.AppScale = function (){
	var defaultWidth = window.innerWidth;
	var defaultHeight = window.innerHeight;
	var bl = defaultWidth / 640;
	var h = defaultHeight / defaultWidth * 640 
	var bl2 =  defaultHeight / h
	//alert(h / bl2 / (1 / ( 1 - bl)) / 2)
	$('body').height(h)
	//$('body').css('transform' , 'scale(' + bl + ') translate(' + (( defaultWidth / 2 ) / -bl / (1 / ( 1 - bl))) + 'px,' + ( - h / bl2 / (1 / ( 1 - bl)) / 2) + 'px)');	
	$('body').css('transform' , 'scale(' + bl + ') translate(' + ( - 640 / bl / (1 / ( 1 - bl2)) / 2) + 'px,' + ( - h / bl2 / (1 / ( 1 - bl)) / 2) + 'px)');	
};

	
	
	
function SPScale ( obj , w , h){
	
	//if(!Zhu._Android){
	
		var videoScale = $(window).height() / 640 - ( h / w  - 1 );
		
		if($(window).height() > h) {
			$(obj).attr('style','-webkit-transform: scale('+videoScale+');transform: scale('+videoScale+');');
			
			
			$(obj).css({
				margin : 'auto' , 
				left : 0 , 
				bottom : 0 , 
				right : 0 , 
				top : 0 ,
				position : 'absolute'
			})
			
		}



		
	//}
	
}
	
function ALERT ( txt  , fn){
	
	if(!window.ALERTHTML)
	{
		window.ALERTHTML = true;
		$('body').append('<div class="weui_dialog_alert">'
		+'<div class="weui_mask"></div>'
		+'<div class="weui_dialog">'
		+'<div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div>'
		+'<div class="weui_dialog_ft">'
		+'<a class="weui_btn_dialog primary" href="javascript:;">确定</a>'
		+'</div></div></div>');
		
		
	};
	
	
		$$('.weui_btn_dialog').unbind('tap').tap(function (){
			$('.weui_dialog_alert').fadeOut();
			if(fn){
			    fn ();
			}
		});
		
		
	
	$('.weui_dialog_title').html(txt);
	$('.weui_dialog_alert').fadeIn();
	
	
}










function bugtxt ( html ){
	
	
	
	
	if(!$('#bugtxt').size())
	{
		$('body').append('<div id="bugtxt" style="color: #000;font-size: 34px; position: absolute; z-index: 999;left: 0;top: 0; word-wrap: break-word;background-color: #fff;width: 100%;"></div>')
	}
	
	
	$('#bugtxt').html(html)
		
}







/*
.weui_btn_dialog.primary { color:rgb(255,154,158) !important}
*/







