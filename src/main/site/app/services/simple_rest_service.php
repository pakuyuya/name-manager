<?php

Loader::loadLibrary('util', 'common');
Loader::loadService('ServiceEx', 'common');

/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/01/22
 * Time: 22:12
 */
abstract class SimpleRestService extends ServiceEx {

    protected abstract function createModel();
    protected abstract function getDefaultValues();

    public function findById($id) {
        $model = $this->createModel();
        return $model->select()
            ->where('id = :id')
            ->params('id', $id)
            ->fetchRow();
    }

    public function create($values) {
        $values = stdClassToArray($values);

        // 補完、不要インデックスのフィルター
        $defValueMap = $this->getDefaultValues();
        $safeValues = [];
        foreach($defValueMap as $k => $v) {
            $safeValues[$k] = isset($values[$k]) ? $values[$k] : $v;
        }

        $safeValues = $this->field_json_encode($safeValues);

        $model = $this->createModel();
        return $model->insert()
            ->values(keysCamel2Snake($safeValues))
            ->execute();
    }

    public function update($id, $values) {
        $values = stdClassToArray($values);

        // 補完、不要インデックスのフィルター
        $defValueMap = $this->getDefaultValues();
        $safeValues = [];
        foreach($defValueMap as $k => $v) {
            if (isset($values[$k])) {
                $safeValues[$k] = $values[$k];
            }
        }

        $model = $this->createModel();
        $model->update()
            ->values(keysCamel2Snake($safeValues))
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

    public function validate($params) {
        return [];
    }

    public function field_json_encode($value) {
        return stdClassToArray($value);
    }

    public function field_json_decode($value) {
        return stdClassToArray($value);
    }
}