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
}