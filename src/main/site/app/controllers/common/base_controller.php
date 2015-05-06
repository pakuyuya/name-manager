<?php

/**
 * 全てのコントローラのルート
 * @author yu
 *
 */
abstract class BaseController extends RestController {
	private $checkLoginEnabled = true;

	/**
	 * ログインチェックを有効にするか（デフォルト：true）
	 *
	 * @param {boolean} $value
	 *        	true=有効/false=無効
	 */
	protected function setEnabledLoginCheck($value) {
		$this->checkLoginEnabled = $value;
	}

	/**
	 * ログインチェックが有効かどうか
	 *
	 * @return boolean
	 */
	protected function isEnabledLoginCheck() {
		return $this->checkLoginEnabled;
	}

	/**
	 * ログインしているかチェックする
	 *
	 * @return boolean 判定
	 */
	protected function checkLogin() {
		// TODO: 実装
		return true;
	}

	/**
	 * 処理を即中断し、403レスポンスを返す。
	 */
	protected function responseDenyed(){
		$this->response->setHttpStatus(403);
		$this->response->send();
	}
}
