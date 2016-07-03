<?php

/**
 * Class TransactionController
 * トランザクション処理を開始します。
 */
class StartController extends JsonBaseController
{
    public function __construct(){
        $this->setEnabledLoginCheck(false);
    }

    public function post() {
        $transaction = $this->service('TransactionService');

        $params = $this->getRequest()->getRestParams();

        $transactionParam = [];
        $transactionParam['num'] = getOr($params, 'num', 1);
        $transactionParam['requireSequence'] = true;

        $tranid = $transaction->start($transactionParam);

        $this->view->json = [
            'result'  => true,
            'tranid'  => $tranid,
        ];
    }
}