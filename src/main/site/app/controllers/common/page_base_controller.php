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

		if ($this->isEnabledLoginCheck ()) {
			if (! $this->checkLogin ()) {
				$this->redirect ( '/login' );
			}
		}
	}

	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::postProcess()
	 */
	public function postProcess() {
	}
}
