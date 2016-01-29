<?php

Loader::loadLibrary('util');
Loader::loadService('SimpleRestService');

class NameService extends SimpleRestService {
    public function createModel() {
        return $this->model('Entry');
    }

    public function find($param) {
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

        $offset = (isset($param['offset'])) ? $param['offset'] : 0;
        $select->offset($offset);

        $limit = (isset($param['limit'])) ? $param['limit'] : 20;
        $select->limit($limit);

        return $select->fetchAll();
    }
}
