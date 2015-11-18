<?php
Loader::loadController ( 'BaseController', 'common' );

/**
 * Backbone用Ajax返答用コントローラ
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
		if ($this->isEnabledLoginCheck()) {
			if (!$this->checkLogin()) {
				$this->responseDenyed();
			}
		}
		// テンプレートをAjax用に指定
		$this->view->enableLayout(false);
		$this->view->setTemplate('index', 'ajax');

		// 出力用空オブジェクトセット
		$this->view->json = (object) array();
	}

	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::preProcess()
	 */
	public function postProcess() {
		$this->view->strjson = json_encode($this->view->json);
		echo $this->view->strjson;
	}
}