<?php
Loader::loadController ( 'BaseController', 'common' );

/**
 * ページ表示用コントローラのルート
 *
 * @author yu
 *
 */
abstract class PageBaseController extends BaseController {


	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::preProcess()
	 */
	public function preProcess() {
		parent::preProcess ();

		// js/コントローラ/コントローラ.jsを読み込む
		$controllerName = $this->getRequest()->getController();
		$this->view->addPreferredJs($controllerName . '/' . $controllerName);

		if ($this->isEnabledLoginCheck ()) {
			if (! $this->checkLogin ()) {
				$this->redirect ( '/login' );
			}
		}

		// {{controller名}}.cssを<link>
		$this->view->addCss($this->request->getController());
	}

	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::postProcess()
	 */
	public function postProcess() {
	}
}
