/*
 *  关于下载相关的公用函数库：
 *	1.下载比财 _downLoad()
 *
 */
import Vue from "vue";
function _downLoad() {
	/* 
	 *	callback1  安卓微信中打开指示图层指示用户在浏览器中下载
	 *	callback2  判断浏览器失败跳转到推荐给好友页面
	 */
	Vue.$indicator.open({
		text: '加载中....',
		spinnerType: 'fading-circle'
	});
	let u = navigator.userAgent;
	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		// var ua = window.navigator.userAgent.toLowerCase();
		// if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		// 	callback1();
		// } else {
		window.location.href = "besharp://finsuit/applink";
		setTimeout(()=>{
			Vue.$indicator.close();
			// window.location.href = "http://finsafe.geong.com:8989/down?ID=1";
			window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage"
		},3000)
		// }
	}
	if (isiOS) {
		window.location.href = "besharp://finsuit";
		setTimeout(()=>{
			Vue.$indicator.close();
			window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage"
			// window.location.href = "https://itunes.apple.com/cn/app/%E6%AF%94%E8%B4%A2/id1149189800?mt=8";
		},3000)
	}
}

export default {
	_downLoad,
}