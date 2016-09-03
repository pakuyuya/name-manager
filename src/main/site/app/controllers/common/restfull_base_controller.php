<?php
Loader::loadController ( 'JsonBaseController', 'common' );

/**
 * Backbone Moddel からのAjax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class RestfullBaseController extends JsonBaseController {

    /**
     * GETリクエストを受けるアクション
     */
    public function index(){
        $params = $this->getRequest()->getRestParams();

        $uriParams = $this->getRequest()->getParams(0);
        if(!isset($uriParams[0])){
            $this->fetchList($params);
        } else {
            $this->fetchOne($$params);
        }
    }

    /**
     * POSTリクエストを受けるアクション
     */
    public function post() {
        $params = $this->getRequest()->getRestParams();

        $urlParams = $this->getRequest()->getParams();
        if(!isset($urlParams[0])){
            $this->responseDenied();
        }
        $tranId = $urlParams[0];

        $this->saveAsNew($tranId, $params);
    }

    /**
     * PUTリクエストを受けるアクション
     */
    public function put(){
        $params = $this->getRequest()->getRestParams();

        $urlParams = $this->getRequest()->getParams();
        if(!isset($urlParams[0]) && !isset($urlParams[1])){
            $this->responseDenied();
        }
        $tranId = $urlParams[0];
        $id = $urlParams[1];

        $this->save($tranId, $id, $params);
    }

    /**
     * DELETEリクエストを受けるアクション
     */
    public function delete() {
        $params = $this->getRequest()->getRestParams();

        $urlParams = $this->getRequest()->getParams();
        if(!isset($urlParams[0]) && !isset($urlParams[1])){
            $this->responseDenied();
        }
        $tranId = $urlParams[0];
        $id = $urlParams[1];

        $this->destroy($tranId, $id, $params);
    }

    /**
     * 全件取得
     *
     * @param params {array} リクエストパラメタ
     */
    protected function fetchList($params) {
        $this->responseDenied();
    }

    /**
     * id指定取得
     *
     * @param tranId {string} トランザクションID
     * @param id {string} 主キー
     * @param params {array} リクエストパラメタ
     */
    protected function fetchOne($tranId, $id, $params) {
        $this->responseDenied();
    }

    /**
     * 新規登録
     *
     * @param $params {array} 追加
     * @return mixed
     */
    protected function saveAsNew($tranId, $params) {
        $this->responseDenied();
    }

    /**
     * 更新
     *
     * @param tranId {string} トランザクションID
     * @param id {string} 主キー
     * @param $params
     * @return mixed
     */
    protected function save($tranId, $params) {
        $this->responseDenied();
    }

    /**
     * 削除リクエスト
     *
     * @param $id     {int}   ID
     * @param $params {array} リクエストパラメタ
     */
    protected function destroy($tranId, $params) {
        $this->responseDenied();
    }
}