<?php

/**
 * Class BasetTransactionController
 * トランザクションコントローラの既定
 */
abstract class BaseTransactionController extends JsonBaseController
{
    public function __construct() {
    }

    public function addService($servicename, $param) {
        $tranid = $this->getRequest()->getRestParams('tranid');
        $transaction = $this->service('transactionService');
    }


    public function preProcess() {
        parent::preProcess();

        $params = $this->getRequest()->getRestParams();
        if (!isset($params['tranid'])
            || !isset($params['index']) || !is_numeric($params['index'])) {
            throw new Exception('パラメータが不正です');
        }
    }
}