<?php

Loader::loadLibrary('util');
Loader::loadService('SimpleRestService');

class NameService extends SimpleRestService {
    public function createModel() {
        return $this->model('Entry');
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
                'entry_name_j like :freeword'
                .' or entry_name_j_kana like :freeword'
                .' or entry_name_e like :freeword'
                .' or entry_alias like :freeword'
                .' or entry_category1 like :freeword'
                .' or member_name like :freeword';

            $select->where($where, ['freeword' => $freeword]);
        }

        if (isset($param['name']) && !isEmptyStr($param['name'])) {
            $name = escapeLike($param['name']);

            $where =
                'entry_name_j like :name'
                .' or entry_name_j_kana like :name'
                .' or entry_name_e like :name';

            $select->whereLike($where, ['name' => $name]);
        }

        if (!empty($param['membertype_id'])) {
            $member_type_id = forceArray($param['membertype_id']);
            $select->whereIn('membertype_id', $member_type_id);
        }

        if (!empty($param['send_expire_from'])) {
            $send_expire_from = toSqlDate($param['send_expire_from']);
            $select->whereGe('send_expire_on', $send_expire_from);
        }

        if (!empty($param['send_expire_to'])) {
            $send_expire_to = toSqlDate($param['send_expire_to']);
            $select->whereLe('send_expire_on', $send_expire_to);
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
        $fields = ['entry_tels', 'entry_fax', 'entry_mails', 'entry_addresses'];

        foreach ($fields as $field) {
            if (is_set($name[$field]) && is_string($name[$field])) {
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
        $fields = ['entry_tels', 'entry_fax', 'entry_mails', 'entry_addresses'];

        foreach ($fields as $field) {
            if (is_set($name[$field]) && !is_string($name[$field])) {
                $name[$field] = json_encode($name[$field]);
            }
        };

        return $name;
    }
}
