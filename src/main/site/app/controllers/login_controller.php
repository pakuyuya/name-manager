<?php
Loader::loadController('PageBaseController', 'common');

class LoginController extends PageBaseController
{
    /**
     * 初期化
     */
    public function initialize()
    {
        // ログインチェックを切る
        $this->setEnabledLoginCheck(false);
    }

    /**
     * index
     */
    public function index()
    {
    }
}
