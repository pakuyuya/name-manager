<?php
Loader::loadController('RestfullBaseController', 'common');

/**
 * ログインAjax用コントローラー
 * @author pak
 */
class NamesController extends RestfullBaseController
{
    public function __construct() {

    }

    /**
     * 全件取得
     *
     * @param params {array} リクエストパラメタ
     */
    protected function fetchList($params) {
        $name = $this->service('NameService');

        $this->json = $name->find($params);
    }

    /**
     * id指定取得
     *
     * @param tranid {string} トランザクションID
     * @param id {string} 主キー
     * @param params {array} リクエストパラメタ
     */
    protected function fetchOne($tranid, $id, $params) {
        // 実装なし
    }

    /**
     * 新規登録
     *
     * @param $params {array} 追加
     * @return mixed
     */
    protected function saveAsNew($tranid, $params) {
        // 実装なし
    }

    /**
     * 更新
     *
     * @param tranid {string} トランザクションID
     * @param id {string} 主キー
     * @param $params
     * @return mixed
     */
    protected function save($tranid, $params) {
        // 実装なし
    }

    /**
     * 削除リクエスト
     *
     * @param $id     {int}   ID
     * @param $params {array} リクエストパラメタ
     */
    protected function destroy($tranid, $params) {
        // 実装なし
    }
}