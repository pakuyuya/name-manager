<?php
Loader::loadController ( 'BaseController', 'common' );

/**
 * Backbone用Ajax返答用コントローラ
 *
 * @author yu
 *
 */
abstract class JsonBaseController extends BaseController {

    protected $json;

    /**
     * {@inheritDoc }
     *
     * @see Controller::preProcess()
     */
    public function preProcess() {
        if ($this->isEnabledLoginCheck()) {
            if (!$this->checkLogin()) {
                $this->responseDenyed();
            }
        }
        $this->view->enableRendering(false);

        // 出力用空オブジェクトセット
        $this->json = (object) array();
    }

    /**
     * {@inheritDoc }
     *
     * @see Controller::preProcess()
     */
    public function postProcess() {
        $this->response->json($this->json);
    }
}