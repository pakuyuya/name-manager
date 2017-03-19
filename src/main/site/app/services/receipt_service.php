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

    protected function getDefaultValues()
    {
        $current_date = date('Y-n-d H:i:s');
        return [
            'entry_id' => '',
            'receipt_date' => null,
            'id_receipttype' => '0',
            'receipt_rem' => '',
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
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