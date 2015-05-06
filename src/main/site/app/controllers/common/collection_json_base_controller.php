<?php
Loader::loadController ( 'JsonBaseController', 'common' );

/**
 * Backbone Collection からのAjax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class CollectionJsonBaseController extends JsonBaseController {

	/**
	 * GETリクエストを受けるコントローラ
	 */
	public function index(){
		$param = $this->getRequest()->getRestParams();
		$this->onFetch($param);
	}

	/**
	 * Backboneにてfetch()実行時に呼ばれるメソッド
	 *
	 * @param array $params リクエストパラメタ
	 */
	protected function onFetch($params){
		// Please override ...
	}

	/**
	 * POSTリクエストを受けるコントローラ
	 */
	public function post(){
		$param = $this->getRequest()->getRestParams();
		$this->onCreate($param);
	}

	/**
	 * Backboneにてcreate()実行時に呼ばれるメソッド
	 * デフォルトでは空配列を返す。
	 *
	 * @param array $params リクエストパラメタ
	 */
	protected function onCreate($params){
		$this->view->data = array();
	}

	/**
	 * PUTリクエストを受けるアクション
	 */
	public function put(){
		// Do nothing
	}

	/**
	 * DELETEリクエストを受けるアクション
	 */
	public function delete(){
		// Do nothing
	}
}