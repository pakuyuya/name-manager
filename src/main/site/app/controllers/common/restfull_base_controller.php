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
            $this->onFetchList($params);
        } else {
            $params['id'] = $uriParams[0];
            $this->onFetchOne($params);
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

        $uriParams = $this->getRequest()->getParams(0);
        if(!isset($uriParams[0])){
            // id がセットされていなかった場合
            $this->responseDenyed();
        }
        $params['id'] = $uriParams[0];

        $this->save($params);
    }

    /**
     * DELETEリクエストを受けるアクション
     */
    public function delete() {
        $params = $this->getRequest()->getRestParams();

        $uriParams = $this->getRequest()->getParams(0);
        if(!isset($uriParams[0])){
            // id がセットされていなかった場合
            $this->responseDenyed();
        }
        $params['id'] = $uriParams[0];

        $this->destroy($params);
    }

    /**
     * 全件取得
     *
     * @param params {array} リクエストパラメタ
     */
    abstract protected function fetchList($params);

    /**
     * id指定取得
     *
     * @param params {array} リクエストパラメタ
     */
    abstract protected function fetchOne($params);

    /**
     * 新規登録
     *
     * @param $params {array} 追加
     * @return mixed
     */
    abstract protected function saveAsNew($params);

    /**
     * 更新
     *
     * @param $id
     * @param $params
     * @return mixed
     */
    abstract protected function save($params);

    /**
     * 削除リクエスト
     *
     * @param $id     {int}   ID
     * @param $params {array} リクエストパラメタ
     */
    abstract protected function destroy($params);
}