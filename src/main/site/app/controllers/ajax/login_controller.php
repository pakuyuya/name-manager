<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('Util', 'common');

/**
 * ログインAjax用コントローラー
 * @author pak
 */
class LoginController extends JsonBaseController
{
    /**
     * LoginController constructor.
     */
    public function __construct(){
        $this->setEnabledLoginCheck(false);
    }

    /**
     *
     */
    public function post(){
        $params = $this->getRequest()->getRestParams();
        $id = getOr($params, 'loginid', null);
        $pw = getOr($params, 'loginpw', null);

        $login = $this->service('LoginService');

        $user =  $login->auth($id, $pw);
        if ($user == null) {
            $this->json->result = false;
            return;
        }

        $login->saveLogin($user);

        $this->json->result = true;
    }
    /**
     * P     */
    public function index(){
        $this->post();
    }

}