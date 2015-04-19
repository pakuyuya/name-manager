<?php

/**
 * 全てのコントローラのルート
 * @author yu
 *
 */
abstract class BaseController extends Controller {
	private $checkLoginEnabled = true;

	/**
	 * ログインチェックを有効にするか（デフォルト：true）
	 *
	 * @param {boolean} $value
	 *        	true=有効/false=無効
	 */
	protected function setCheckLoginEnabled($value) {
		$this->checkLoginEnabled = $value;
	}

	/**
	 * ログインチェックが有効かどうか
	 *
	 * @return boolean
	 */
	protected function isCheckLoginEnabled() {
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
}
