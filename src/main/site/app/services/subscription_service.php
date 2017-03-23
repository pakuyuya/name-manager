<?php
/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/04/17
 * Time: 19:22
 */

Loader::loadService('SimpleRestService');

class SubscriptionService extends SimpleRestService
{
    public function createModel()
    {
        return $this->model('EntrySubscription');
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
            'hiroba_num' => null,
            'focus_num' => null,
            'id_sendtype' => 0,
            'send_govnumber' => '',
            'send_rem' => '',
            'send_enabled' => 1,
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
    }

    /**
     * Subscriptionを検索する。
     * @param $param
     * @return mixed
     */
    public function find($param) {
        $select = $this->createSelectQuery($param);

        $paramOrder = getOr($param, 'order', null);
        $orderAllows = ['receipt_date'];
        $defaultOrder = 'id';

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
        return $this->createSelectQuery($param)
                     ->fetchCount();
    }

    /**
     * @param $name_id NameのID
     * @return bool
     */
    public function deleteByNameId($name_id) {

        $model = $this->createModel();

        return $model->delete()
                    ->where('entry_id', $name_id)
                    ->execute();
    }


    /**
     * SqlSelectインスタンスを返却する
     * @param $param パラメータ
     * @return SqlSelect インスタンス
     */
    private function createSelectQuery($param) {

        $model = $this->createModel();
        $select = $model->select();

        if (isset($param['entry_id'])) {
            $select->where('entry_id', $param['entry_id']);
        }

        return $select;
    }
}