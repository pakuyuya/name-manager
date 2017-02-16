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

    protected function getFields()
    {
        $current_date = date('Y-n-d H:i:s');
        return [
            'entry_id' => '',
            'receipt_date' => null,
            'receipt_type' => '',
            'receipt_rem' => '',
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
    }

}