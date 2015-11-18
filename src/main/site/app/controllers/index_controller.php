<?php
Loader::loadController('PageBaseController', 'common');

/**
 * デフォルトコントローラー
 * @author pak
 */
class IndexController extends PageBaseController
{
    /**
     * デフォルトページ
     */
    public function index()
    {
        $this->redirect('/main');
    }

}