<?php
Loader::loadController ( 'JsonBaseController', 'common' );

/**
 * Backbone Moddel からのAjax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class ModelJsonBaseController extends JsonBaseController {

	/**
	 * GETリクエストを受けるアクション
	 */
	public function index(){
		$params = $this->getRequest()->getRestParams();
		$this->onFetch($params);
	}

	/**
	 * Backboneにてfetch()実行時に呼ばれるメソッド
	 *
	 * @param params {array} リクエストパラメタ
	 */
	protected function onFetch($params){
		// Please override ...
	}

	/**
	 * POSTリクエストを受けるアクション
	 */
	public function post(){
		$params = $this->getRequest()->getRestParams();
		$this->onSaveNew($params);
	}

	/**
	 * Backboneにて、id未指定でsave()実行時に呼ばれるメソッド
	 *
	 * @param params {array} リクエストパラメタ
	 */
	protected function onSaveNew($params){
		// Please override ...
	}

	/**
	 * PUTリクエストを受けるアクション
	 */
	public function put(){
		$params = $this->getRequest()->getRestParams();

		$uriParams = $this->getRequest()->getParams(0);
		if(!isset($uriParams[0])){
			// id がセットされていなかった場合
			$this->responseDenyed();
		}

		$this->onSaveUpdate($params);
	}

	/**
	 * Backboneにて、id指定でsave()実行時に呼ばれるメソッド
	 *
	 * @param params {array} リクエストパラメタ
	 */
	protected function onSaveNew($params){
		// Please override ...
	}

	/**
	 * DELETEリクエストを受けるアクション
	 */
	public function delete(){
		$params = $this->getRequest()->getRestParams();

		$uriParams = $this->getRequest()->getParams(0);
		if(!isset($uriParams[0])){
			// id がセットされていなかった場合
			$this->responseDenyed();
		}

		$this->onDestroy($params);
	}

	/**
	 * Backboneにて、id指定でdestroy()実行時に呼ばれるメソッド
	 *
	 * @param params {array} リクエストパラメタ
	 */
	protected function onDestroy($params){
		// Please override ...
	}
}