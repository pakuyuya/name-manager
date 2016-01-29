<?php
class LoginService extends Service
{
    /**
     * ログイン情報の取得を試みる
     * @param string $userid
     * @param string $password
     * @return array ログインデータ構造。見つからない場合null
     */
    public function auth($userid, $password)
    {
        // DB探索
        $admin = $this->model('LoginUser');

        $result = $admin->select()
            ->where('login_id = :login_id and login_pw = :login_pw')
            ->params('login_id', $userid)
            ->params('login_pw', $password)
            ->fetchRow();

        if(!$result)
            return null;

        // 結果を作成し返却
        $ret = array(
            'login_id' => $result['login_id'],
            'user_name' => $result['user_name'],
            'logined_at' => time()
        );

        return $ret;
    }

    /**
     * ログイン情報をセッションに格納する
     * @param unknown $logininfo
     */
    public function saveLogin($loginInfo)
    {
        $ses = new Session('login');
        $ses->set('loginInfo', $loginInfo);
    }

    /**
     * ログイン情報をセッションから取得する
     */
    public function loadLoginInfo()
    {
        $ses = new Session('login');
        if(!$ses->exists('loginInfo'))
            return null;

        return $ses->get('loginInfo');
    }
}