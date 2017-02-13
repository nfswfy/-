



wx.ready(function () {
			
		
			
		//http://pepsi.event.smartapi.cn/?from=singlemessage&isappinstalled=0
	
		
		
		window.ShareUpData = function (){
				
				wx.onMenuShareAppMessage({
		
			desc: window.wxData.desc, // 分享描述
			title: window.wxData.title, // 分享标题
			link: window.wxData.link, // 分享链接
			imgUrl: window.wxData.imgUrl, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
				//location.href = 'video.html';
				window.wxData.succ();
	ga('send', 'event', '地址页', '右上角分享')
				_smq.push(['custom','地址页','右上角分享']);

			},
			cancel: function () { 
			}
		});
				wx.onMenuShareTimeline({
			title: window.wxData.desc, // 分享标题
			link: window.wxData.link, // 分享链接
			imgUrl: window.wxData.imgUrl, // 分享图标
			success: function () { 
				// 用户确认分享后执行的回调函数
				window.wxData.succ();
	ga('send', 'event', '地址页', '右上角分享')
				_smq.push(['custom','地址页','右上角分享']);
				
				//location.href = 'video.html';
			},
			cancel: function () { 
			
			}
		});
		};
		
		
		window.ShareUpData();
		});
var WEBURL = 'http://coffeemaker2016.siemens-home.bsh-group.cn/'	
window.wxData = {
        "imgUrl" : WEBURL + 'images/share.jpg',
        "link" : 'http://coffeemaker2016.siemens-home.bsh-group.cn/',
        "title" :document.title ,
        "desc" :  "这里有一平米，对你而言或许刚刚好",
		succ : function (){}
};


window.wxData.succ = function (){};
window.ShareUpData = function (){};







