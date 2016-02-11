<?php
Loader::loadController('RestfullBaseController', 'common');
Loader::loadLibrary('util', 'common');

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
        $name = $this->service('NameService');

        $params = $this->request->getQuery();
        $params['offset'] = (int)getOr($params, 'offset', 0);
        $params['limit'] = (int)getOr($params, 'limit', 20);

        $datas = $name->find($params);
        $total = $name->getCount($params);
        $idxfrom = ($datas > 0) ? $params['offset'] + 1 : 0;
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