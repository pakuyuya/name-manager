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
     * 検索
     * @param $param
     * @return array
     */
    public function find($param) {
        $select = $this->createSelectQuery($param);

        $paramOrder = getOr($param, 'order', null);
        $orderAllows = ['receipt_date'];
        $defaultOrder = 'receipt_date';

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

    /**
     * 件数取得
     * @param $param
     * @return string
     */
    public function getCount($param) {
        $select = $this->createSelectQuery($param);

        return $select->fetchCount();
    }

    /**
     * Select句作成
     * @param $param
     * @return SqlSelect
     */
    private function createSelectQuery($param) {
        $model = $this->createModel();
        $select = $model->select();

        if (!empty($param['entry_id'])) {
            $entry_id = $param['entry_id'];
            $select->whereLe('entry_id', $entry_id);
        }

        return $select;
    }

    /**
     * NameIdをもとに検索
     * @param $entry_id NameのID
     * @return
     */
    public function findByNameId($entry_id) {

        $model = $this->createModel();

        return $model->select()
            ->where('entry_id', $entry_id)
            ->order('receipt_date')
            ->fetchAll();
    }

    /**
     * @param $name_id NameのID
     * @return
     */
    public function findLastByNameId($name_id) {

        $model = $this->createModel();

        return $model->select()
            ->where('entry_id', $name_id)
            ->order('receipt_date desc')
            ->fetchRow();
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