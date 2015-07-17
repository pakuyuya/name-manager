<?php
Loader::loadController('JsonBaseController', 'common');

/**
 * ログインAjax用コントローラー
 * @author pak
 */
class LoginController extends JsonBaseController
{
	public function __construct(){
		$this->setEnabledLoginCheck(false);
	}

	/**
	 * デフォルトページ
	 */
	public function post(){
		$this->view->json->result = true;
	}
	/**
	 * デフォルトページ
	 */
	public function index(){
		$this->view->json->result = true;
	}

}