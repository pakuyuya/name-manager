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

    protected function getDefaultValues()
    {
        $current_date = date('Y-n-d H:i:s');
        return [
            'name_j' => '',
            'name_k' => '',
            'name_e' => '',
            'alias' => '',
            'category1' => '',
            'category2' => '',
            'tels' => '[]',
            'fax' => '',
            'mails' => '[]',
            'url' => '',
            'country' => '',
            'rem_j' => '',
            'rem_e' => '',
            'addresses' => '[]',
            'send_zipcode' => '',
            'send_address' => '',
            'postalzone' => '',
            'officertype_id' => '0',
            'cd_membertype' => '0',
            'member_name' => '',
            'member_rem' =>  '',
            'member_expire_on' => null,
            'send_expire_on' => null,
            'term_id' => '0',
            'term' => '',
            'label' => '',
            'create_at' => $current_date,
            'update_at' => $current_date,
        ];
    }


    protected function destroy($id, $params) {
        parent::destroy($id, $params);

        $this->service('SubscriptionService')
                ->deleteByNameId($id);

        $this->service('ReceiptService')
                ->deleteByNameId($id);
    }
}