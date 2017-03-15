<?php
Loader::loadController('SimpleRestfulController', 'common');

/**
 * 送信エントリーリソース
 * @author paku
 */
class SubscriptionController extends SimpleRestfulController
{
    public function __construct() {

    }

    protected function createService() {
        return $this->service('SubscriptionService');
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
}