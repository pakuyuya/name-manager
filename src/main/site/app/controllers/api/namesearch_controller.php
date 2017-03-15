<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * ログインAjax用コントローラー
 * @author pak
 */
class NamesearchController extends JsonBaseController
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
                'send_expire_to' => [
                    ['rule' => 'date']
                ]
            ]
        );

        $params = $this->request->getQuery();
        if(!$validator->validate($params)) {
            $this->responceDenied();
        }

        $svName = $this->service('NameService');
        $svMemberType = $this->service('MemberTypeService');


        $params['offset'] = (int)getOr($params, 'offset', 0);
        $params['limit'] = (int)getOr($params, 'limit', 20);

        $datas = $svName->find($params);

        $memberTypes = $svMemberType->findAll();
        foreach ($datas as $idx => $data) {
            $data['member_type'] = '';
            foreach ($memberTypes as $memberType) {
                if ($memberType['value'] === ($data['id_membertype'] . '')) {
                    $datas[$idx]['membertype'] = $memberType['name'];
                    break;
                }
            }
        }

        $total = $svName->getCount($params);
        $idxfrom = ($total > 0) ? $params['offset'] + 1 : 0;
        $idxto   = (int)$params['offset'] + count($datas);

        $this->json = [
            "result" => true,
            "datas" => $datas,
            "total" => $total,
            "idxfrom" => $idxfrom,
            "idxto" => $idxto,
        ];
    }
}