// common.js
//  create: 2015/05/09 by yu

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../dialog.ts" />
/// <reference path="../tips.ts" />
/// <reference path="../common.ts" />

/**
 * /login 用JS定義
 */
module Login{

	/**
	 * 初期化
	 */
	export function init(){
		startOnloadAnimation();
		initEvents();
	}

	/**
	 * ページのDOMにイベントリスナを追加する。
	 */
	function initEvents(){
		$('#login-form').submit(onSubmitLogin);
	}

	/**
	 * ロード時のアニメーションを開始する。
	 */
	function startOnloadAnimation(){
	}

	function askLogin(){
		// disabled form
		$('#login-button').attr('disabled', 'disabled');

		var param = {
			loginId : $('#loginId').val(),
			loginPw : $('#loginPw').val(),
		};
		$.ajax(
			{
				url  :'ajax/login',
			    data : param,
				success : function(d, s){
					if(s === 'error' || toString.call(d) !== '[object Object]'){
						Common.systemErr();
					}
					if(d.result){
						$(location).attr('href', 'main');
					}
				},
				error : function(){Common.systemErr(); console.log('Access Error'); },
				complete : function(){ $('#login-button').removeAttr('disabled'); },
				dataType : 'json',
			}
		);
	}

	function onSubmitLogin(){
		askLogin();
		return false;
	}
}
// onload
$(Login.init);
