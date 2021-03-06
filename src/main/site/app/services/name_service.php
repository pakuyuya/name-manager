<?php

Loader::loadLibrary('util');
Loader::loadService('SimpleRestService');

class NameService extends SimpleRestService {
    public function createModel() {
        return $this->model('Entry');
    }

    public function getDefaultValues() {
        $current_date = date('Y-n-d H:i:s');
        return [
            'name_j' => '',
            'name_k' => '',
            'name_e' => '',
            'send_name_index' => '0',
            'alias' => '',
            'category1' => '',
            'category2' => '',
            'tels' => '[]',
            'fax' => '',
            'mails' => '[]',
            'url' => '',
            'country' => '',
            'rem_j' => '',
            'rem_e' => '',
            'addresses' => '[]',
            'sendindex' => '0',
            'send_zipcode' => '',
            'send_address' => '',
            'postalzone' => 'J',
            'id_director' => '0',
            'id_membertype' => '0',
            'member_name' => '',
            'member_rem' =>  '',
            'member_expire_on' => null,
            'id_term' => '0',
            'label' => '',
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
    }

    public function find($param) {

        $select = $this->createSelectQuery($param);

        $paramOrder = getOr($param, 'order', null);
        $orderAllows = ["id", "expire_at"];
        $defaultOrder = "id";

        $order = whiteboxOr($paramOrder, $orderAllows, $defaultOrder);
        $select->order($order);

        if (isset($param['offset'])) {
            $select->offset($param['offset']);
        }

        if (isset($param['limit'])) {
            $select->limit($param['limit']);
        }

        return $select->fetchAll();
    }

    public function getCount($param) {
        $select = $this->createSelectQuery($param);

        return $select->fetchCount();
    }

    private function createSelectQuery($param) {
        $model = $this->createModel();
        $select = $model->select();

        if (isset($param['freeword']) && !isEmptyStr($param['freeword'])) {
            $freeword = '%' . escapeLike($param['freeword']) . '%';

            $where =
                'name_j like :freeword'
                .' or name_k like :freeword'
                .' or name_e like :freeword'
                .' or alias like :freeword'
                .' or category1 like :freeword'
                .' or member_name like :freeword';

            $select->where($where, ['freeword' => $freeword]);
        }

        if (isset($param['name']) && !isEmptyStr($param['name'])) {
            $name = escapeLike($param['name']);

            $where =
                'name_j like :name'
                .' or name_j_kana like :name'
                .' or name_e like :name';

            $select->whereLike($where, ['name' => $name]);
        }

        if (!empty($param['id_membertype'])) {
            $member_type_id = forceArray($param['id_membertype']);
            $select->whereIn('id_membertype', $member_type_id);
        }

        if (!empty($param['member_expire_from'])) {
            $member_expore_from = toSqlDate($param['member_expire_from']);
            $select->whereGe('member_expire_on', $member_expore_from);
        }

        if (!empty($param['member_expire_to'])) {
            $member_expire_to = toSqlDate($param['member_expire_to']);
            $select->whereLe('member_expire_on', $member_expire_to);
        }

        return $select;
    }

    /**
     * 名簿情報を検証する
     * @param $name
     * @return エラーメッセージ
     */
    public function validate($name) {
        $errors = [];
        // TODO:

        return $errors;
    }

    /**
     * JSONフォーマットの項目をJSONデコードする
     * @param $name モデル
     * @return mixed フォーマット後のモデル
     */
    public function field_json_decode($name) {
        $fields = ['tels', 'mails', 'addresses'];

        foreach ($fields as $field) {
            if (isset($name[$field]) && is_string($name[$field])) {
                $name[$field] = json_decode($name[$field]);
            }
        };

        return $name;
    }

    /**
     * JSONフォーマットの項目をJSONエンコードする
     * @param $name モデル
     * @return mixed フォーマット後のモデル
     */
    public function field_json_encode($name) {
        $fields = ['tels', 'fax', 'mails', 'addresses'];

        foreach ($fields as $field) {
            if (isset($name[$field]) && !is_string($name[$field])) {
                $name[$field] = json_encode($name[$field]);
            }
        };

        return $name;
    }
}
