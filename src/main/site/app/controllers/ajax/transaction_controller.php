<?php

/**
 * Class TransactionController
 * トランザクション処理を開始します。
 */
class TransactionController extends JsonBaseController
{
    public function __construct(){
        $this->setEnabledLoginCheck(false);
    }

    public function post() {

        $transaction = $this->service('TransactionService');
        $tranid = $transaction->start();

        $this->view->json = [
            'result'  => true,
            'tranid'  => $tranid,
        ];
    }
}