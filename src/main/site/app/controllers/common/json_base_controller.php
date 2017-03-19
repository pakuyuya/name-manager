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
        parent::preProcess();

        if ($this->isEnabledLoginCheck()) {
            if (!$this->checkLogin()) {
                $this->responseDenied();
            }
        }
        $this->getRequest()->setAutoTrim(true);
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

    public function setOKResponse($statusCode, $data = null) {
        http_response_code($statusCode);
        if(!$data !== null) {
            $this->setJson($data);
        }
    }
    public function setErrorResponse($statusCode, $errors = null) {
        http_response_code($statusCode);
        if(!empty($errors)) {
            $json = ['error' => $errors];
            $this->setJson($json);
        }
    }

    public function setJson($data) {
        $this->json = $data;
    }
}