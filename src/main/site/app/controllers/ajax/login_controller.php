<?php
Loader::loadController('AjaxBaseController', 'common');

/**
 * ログインAjax用コントローラー
 * @author pak
 */
class LoginController extends AjaxBaseController
{
	public function __construct(){
		$this->setEnabledLoginCheck(false);
	}

	/**
	 * デフォルトページ
	 */
	public function auth(){
		$this->redirect('/main');
	}

}