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

        if (isset($param['freeword'])) {
            $freeword = escapeLike($param['freeword']);

            $select->where('entry_name_j', $freeword);
            $select->where('entry_name_j_kana', $freeword);
            $select->where('entry_name_j', $freeword);
            $select->where('entry_alias', $freeword);
            $select->where('entry_category1', $freeword);
            $select->where('member_name', $freeword);
        }

        if (isset($param['name'])) {
            $name = escapeLike($param['name']);

            $select->where('entry_name_j', $name);
            $select->where('entry_name_j_kana', $name);
            $select->where('entry_name_j', $name);
        }

        if (isset($param['member_type_id'])) {
            $member_type_id = $param['member_type_id'];
            $select->whereIn('member_type_id', $member_type_id);
        }

        return $select;
    }
}
