<?php
Loader::loadController ( 'RestfulBaseController', 'common' );

/**
 * Backbone Moddel からのAjax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class SimpleRestfulController extends RestfulBaseController
{
    public function __construct() {

    }

    /**
     * id指定取得
     *
     * @param tranid {string} トランザクションID
     * @param id {string} 主キー
     * @param params {array} リクエストパラメタ
     */
    protected function fetchOne($id, $param) {
        $service = $this->createService();

        $result = $service->findById($id);

        if ($result !== false) {
            $this->setOKResponse(200, $result);
        } else {
            $this->setErrorResponse(404, 'not found');
        }
    }

    /**
     * 新規登録
     *
     * @param fields {array} 追加
     * @return mixed
     */
    protected function saveAsNew($fields) {
        $service = $this->createService();

        if (method_exists($service, 'field_json_decode')) {
            $fields = $service->field_json_decode($fields);
        }

        // 事前検証
        $errors = $service->validate($fields);
        if (!empty($errors)) {
            $this->setErrorResponse(400, $errors);
            return;
        }

        // 補完、不要インデックスのフィルター
        $defValueMap = $this->getDefaultValues();
        $safeValue = [];
        foreach($defValueMap as $k => $v) {
            $safeValue[$k] = isset($fields[$k]) ? $fields[$k] : $v;
        }

        if (method_exists($service, 'field_json_encode')) {
            $safeValue = $service->field_json_encode($safeValue);
        }

        // 登録
        $id = $service->create($safeValue);
        $safeValue['id'] = $id;

        $this->setOKResponse(200, $safeValue);
    }

    /**
     * 更新
     *
     * @param id {string} 主キー
     * @param fields
     * @return mixed
     */
    protected function save($id, $fields) {
        $service = $this->createService();

        if (method_exists($service, 'field_json_decode')) {
            $fields = $service->field_json_decode($fields);
        }

        // 事前検証
        $errors = $service->validate($fields);
        if (!empty($errors)) {
            $this->setErrorResponse(400, $errors);
            return;
        }

        // 対象抽出
        $exists = $service->findBytId($id);

        if (!$exists) {
            $this->setErrorResponse(404, ['resource not found.']);
            return;
        }

        if (method_exists($service, 'field_json_encode')) {
            $fields = $service->field_json_encode($fields);
        }
        $current_date = date('Y-n-d H:i:s');
        $fields = array_merge($fields,
            [
                'update_at' => $current_date,
            ]
        );

        $result = $service->update($id, $fields);
        if (!$result) {
            $this->setErrorResponse(500, ['update query failed. please show application log.']);
            return;
        }

        $this->setOKResponse(200, $result);
    }

    /**
     * 削除リクエスト
     *
     * @param $id     {int}   ID
     * @param $params {array} リクエストパラメタ
     */
    protected function destroy($id, $params) {
        $service = $this->createService();

        if (!$service->findById($id)) {
            $this->setErrorResponse(404, ['resource not found.']);
            return;
        }

        $service->delete($id);

        $this->setErrorResponse(204);
    }

    /**
     * サービスを生成し返却する。
     *
     * @return mixed
     */
    abstract protected function createService();

    /**
     * フィールドの定義を出力する。
     *
     * @return mixed
     */
    abstract protected function getDefaultValues();

    protected function validateField($fields) {
        $service = $this->createService();
        return method_exists($service, 'validate') ? $service->validate($fields) : true;
    }
}