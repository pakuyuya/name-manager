<?php
Loader::loadController('SimpleRestfulController', 'common');

/**
 * 送信エントリーリソース
 * @author paku
 */
class ReceiptController extends SimpleRestfulController
{
    public function __construct() {

    }

    protected function createService() {
        return $this->service('ReceiptService');
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
}