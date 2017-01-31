<?php
Loader::loadController('RestfullBaseController', 'common');

/**
 * 名簿リソース
 * @author pak
 */
class NameController extends RestfullBaseController
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
    protected function fetchOne($id) {
        $name = $this->service('NameService');

        $result = $name->findById($id);

        if ($result !== false) {
            $this->setOKResponse(200, $result);
        } else {
            $this->setErrorResponse(404, 'not found');
        }
    }

    /**
     * 新規登録
     *
     * @param $params {array} 追加
     * @return mixed
     */
    protected function saveAsNew($params) {
        $nameService = $this->service('NameService');

        $name = $nameService->field_json_decode($params);

        // 事前検証
        $errors = $nameService->validate($name);
        if (!empty($errors)) {
            $this->setErrorResponse(400, $errors);
            return;
        }

        // 補完
        $current_date = date('Y-n-d H:i:s');
        $name = array_merge($name,
            [
                'entry_name_j' => '',
                'entry_name_j_kana' => '',
                'entry_name_e' => '',
                'entry_alias' => '',
                'entry_category1' => '',
                'entry_category2' => '',
                'entry_entity_type' => '',
                'entry_tels' => '[]',
                'entry_fax' => '[]',
                'entry_mails' => '[]',
                'entry_url' => '',
                'entry_country' => '',
                'entry_rem_j' => '',
                'entry_rem_e' => '',
                'entry_addresses' => '[]',
                'entry_send_zipcode' => '',
                'entry_send_address' => '',
                'entry_postalzone' => '',
                'officertype_id' => '',
                'cd_mebertype' => '',
                'member_name' => '',
                'member_rem' =>  '',
                'member_expire_on' => null,
                'send_expire_on' => null,
                'term_id' => '0',
                'entry_term' => '',
                'create_at' => $current_date,
                'update_at' => $current_date,
            ]
         );

        $name = $nameService->field_json_encode($name);

        $result = $nameService->create($name);
        $this->setOKResponse(200, $result);
    }

    /**
     * 更新
     *
     * @param tranid {string} トランザクションID
     * @param id {string} 主キー
     * @param $params
     * @return mixed
     */
    protected function save($id, $params) {
        $nameService = $this->service('NameService');

        $name = $nameService->field_json_decode($params);

        // 事前検証
        $errors = $nameService->validate($params);
        if (!empty($errors)) {
            $this->setErrorResponse(400, $errors);
            return;
        }

        // 対象抽出
        $exists = $nameService->findBytId($id);

        if (!$exists) {
            $this->setErrorResponse(404, ['resource not found.']);
            return;
        }

        $name = $nameService->field_json_encode($name);
        $current_date = date('Y-n-d H:i:s');
        $name = array_merge($name,
            [
                'update_at' => $current_date,
            ]
        );

        $result = $nameService->update($id, $name);
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
        $nameService = $this->service('NameService');

        if (!$nameService->findById($id)) {
            $this->setErrorResponse(404, ['resource not found.']);
            return;
        }

        $this->setErrorResponse(204);
    }
}