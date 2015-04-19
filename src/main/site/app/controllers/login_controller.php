<?php
Loader::loadController('PageBaseController', 'common');

class LoginController extends PageBaseController
{
	/**
	 * コンストラクタ
	 */
	public function __construct()
	{
		// ログインチェックを切る
		$this->setCheckLoginEnabled(false);
	}

	/**
	 *
	 */
	public function index()
	{
	}
}
