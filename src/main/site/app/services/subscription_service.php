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
            'send_num' => null,
            'id_send_item' => 0,
            'id_sendtype' => 0,
            'send_govnumber' => '',
            'send_rem' => '',
            'send_enabled' => 1,
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
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
}