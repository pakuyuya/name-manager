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
		if ($this->isCheckLoginEnabled ()) {
			if (! $this->checkLogin ()) {
			}
		}
	}

	/**
	 * {@inheritDoc }
	 *
	 * @see Controller::preProcess()
	 */
	public function postProcess() {
	}
}