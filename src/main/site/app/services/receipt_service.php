<?php
/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/04/17
 * Time: 19:22
 */

Loader::loadService('SimpleRestService');

class ReceiptService extends SimpleRestService
{
    public function createModel()
    {
        return $this->model('EntryReceipt');
    }

    public function validate($fields)
    {
        // TODO:
        return [];
    }

    /**
     * @param $name_id NameのID
     */
    public function deleteByNameId($name_id) {

        $model = $this->createModel();

        return $model->delete()
            ->where('entry_id', $name_id)
            ->execute();
    }
}