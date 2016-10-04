<?php

Loader::loadLibrary('util');

/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/01/22
 * Time: 22:12
 */
abstract class SimpleRestService extends Service {

    protected abstract function createModel();

    public function findById($id) {
        $model = $this->createModel();
        return $model->select()
            ->where('id = :id')
            ->params('id', $id)
            ->fetchRow();
    }

    public function create($values) {
        $model = $this->createModel();
        return $model->insert()
            ->values(keysCamel2Snake($values))
            ->execute();
    }

    public function update($id, $values) {
        $model = $this->createModel();
        $model->update()
            ->values(keysCamel2Snake($values))
            ->where('id = :id')
            ->params('id', $id)
            ->execute();
    }

    public function delete($id) {
        $model = $this->createModel();
        $model->delete()
            ->where('id = :id')
            ->params('id', $id)
            ->execute();
    }
}