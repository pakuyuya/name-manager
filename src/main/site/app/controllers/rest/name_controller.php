<?php
Loader::loadController('SimpleRestfulController', 'common');

/**
 * 名簿リソース
 * @author pak
 */
class NameController extends SimpleRestfulController
{
    public function __construct() {

    }

    protected function createService() {
        return $this->service('NameService');
    }


    protected function destroy($id, $params) {
        parent::destroy($id, $params);

        $this->service('SubscriptionService')
                ->deleteByNameId($id);

        $this->service('ReceiptService')
                ->deleteByNameId($id);
    }
}