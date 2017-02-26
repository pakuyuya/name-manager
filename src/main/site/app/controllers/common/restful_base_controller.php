<?php
Loader::loadController ( 'JsonBaseController', 'common' );

/**
 * Backbone Moddel からのAjax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class RestfulBaseController extends JsonBaseController {

    /**
     * GETリクエストを受けるアクション
     */
    public function index(){
        $params = $this->getRequest()->getRestParams();

        $uriParams = $this->getRequest()->getParams(0);
        if(!isset($uriParams[0])){
            $this->fetchList($params);
        } else {
            $this->fetchOne($uriParams[0], $params);
        }
    }

    /**
     * POSTリクエストを受けるアクション
     */
    public function post() {
        $params = $this->getRequest()->getRestParams();

        $this->saveAsNew($params);
    }

    /**
     * PUTリクエストを受けるアクション
     */
    public function put(){
        $params = $this->getRequest()->getRestParams();

        $urlParams = $this->getRequest()->getParams();
        if(!isset($urlParams[0])){
            $this->setErrorResponse(400, 'URL must contains id.');
        }
        $id = $urlParams[0];

        $this->save($id, $params);
    }

    /**
     * DELETEリクエストを受けるアクション
     */
    public function delete() {
        $params = $this->getRequest()->getRestParams();

        $urlParams = $this->getRequest()->getParams();
        if(!isset($urlParams[0])){
            $this->setErrorResponse(400, 'URL must contains id.');
        }
        $id = $urlParams[0];

        $this->destroy($id, $params);
    }

    /**
     * 全件取得
     *
     * @param params {array} リクエストパラメタ
     */
    protected function fetchList($params) {
        $this->setErrorResponse(404, "Unsupported query.");
    }

    /**
     * id指定取得
     *
     * @param tranId {string} トランザクションID
     * @param id {string} 主キー
     * @param params {array} リクエストパラメタ
     */
    protected function fetchOne($id, $params) {
        $this->setErrorResponse(404, "Unsupported query.");
    }

    /**
     * 新規登録
     *
     * @param $params {array} 追加
     * @return mixed
     */
    protected function saveAsNew($params) {
        $this->setErrorResponse(404, "Unsupported query.");
    }

    /**
     * 更新
     *
     * @param tranId {string} トランザクションID
     * @param id {string} 主キー
     * @param $params
     * @return mixed
     */
    protected function save($id, $params) {
        $this->setErrorResponse(404, "Unsupported query.");
    }

    /**
     * 削除リクエスト
     *
     * @param $id     {int}   ID
     * @param $params {array} リクエストパラメタ
     */
    protected function destroy($id, $params) {
        $this->setErrorResponse(404, "Unsupported query.");
    }

    /**
     * 事前処理
     */
    public function preProcess() {

    }
}