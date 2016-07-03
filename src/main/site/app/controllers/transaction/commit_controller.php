<?php

/**
 * Class TransactionController
 * トランザクション処理を開始します。
 */
class CommitController extends JsonBaseController
{
    public function __construct(){
        $this->setEnabledLoginCheck(false);
    }

    public function post() {
        $params = $this->getRequest()->getRestParams();

        $this->validateParams($params);

        $tranid = $params['tranid'];

        $transaction = $this->service('TransactionService');

        $transaction->validateConstraint($tranid);
        $transaction->commit($tranid);

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