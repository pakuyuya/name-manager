<?php
Loader::loadController ( 'BaseController', 'common' );

/**
 * Ajax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class JsonBaseController extends BaseController {
	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::preProcess()
	 */
	public function preProcess() {
		if ($this->isEnabledLoginCheck ()) {
			if (! $this->checkLogin ()) {
			}
		}
		// テンプレートをAjax用に指定
		$this->view->enableLayout(false);
		$this->view->setTemplate('ajax', 'index');

		// 出力用空オブジェクトセット
		$this->view->json = (object) array();
	}

	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::preProcess()
	 */
	public function postProcess() {
		$this->view->strjson = encode_json($this->view->json);
	}
}