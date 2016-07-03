<?php

/**
 * Class RollbackController
 * トランザクション処理を取り消します。
 */
class RollbackController extends JsonBaseController
{
    public function __construct(){
        $this->setEnabledLoginCheck(false);
    }

    public function post() {
        $params = $this->getRequest()->getRestParams();

        $this->validateParams($params);

        $tranid = $params['tranid'];

        $transaction = $this->service('TransactionService');

        $transaction->rollback($tranid);

        $this->view->json = [
            'result'  => true,
            'tranid'  => $tranid,
        ];
    }

    private function validateParams($params) {
        if (!isset($params['tranid'])) {
            throw new Exception('tranidが設定されていません。');
        }
    }
}