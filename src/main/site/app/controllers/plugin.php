<?php

/**
 * Class Plugin
 * Cuuryの動作をカスタマイズするプラグイン
 * 全ControllerのpreProcessを行う
 */
class Plugin Extends PluginAbstract {

    public function preProcess()
    {
        // Smartyのデリミタを変更
        $smarty = $this->view->getSmarty();
        $smarty->left_delimiter = '_{';
        $smarty->right_delimiter = '}_';
    }
}