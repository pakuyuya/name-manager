<?php
Loader::loadController('PageBaseController', 'common');

class LoginController extends PageBaseController
{
	public function initialize()
	{
		// ログインチェックを切る
		$this->setEnabledLoginCheck(false);
	}

	/**
	 *
	 */
	public function index()
	{
	}
}
