<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * 購読情報検索API
 */
class SubscriptionsearchController extends JsonBaseController
{
    public function __construct() {
    }

    /**
     * GET request
     */
    public function index() {
        // validation
        $validator = new ValidatorEx();
        $validator->setRules(
            [
                'offset' => [
                    ['rule' => 'number_string']
                ],
                'limit' => [
                    ['rule' => 'number_string']
                ],
                'send_expire_from' => [
                    ['rule' => 'date']
                ],
            ]
        );

        $params = $this->request->getQuery();
        if(!$validator->validate($params)) {
            $this->responceDenied();
        }

        $subscriptionService = $this->service('SubscriptionService');


        $params['offset'] = (int)getOr($params, 'offset', 0);
        // $params['limit'] = (int)getOr($params, 'limit', 100);

        $datas = $subscriptionService->find($params);

        $total = $subscriptionService->getCount($params);
        $idxfrom = ($total > 0) ? $params['offset'] : 0;
        $cnt = count($datas);
        $idxto   = (int)$params['offset'] + $cnt - (($cnt>0) ? 1 : 0);

        $this->json = [
            "result" => true,
            "datas" => $datas,
            "total" => $total,
            "idxfrom" => $idxfrom,
            "idxto" => $idxto,
        ];
    }
}