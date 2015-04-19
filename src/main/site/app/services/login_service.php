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
		// DBから取得
		$db = Db::factory();

		// DB探索
		$mdAdmin = $this->model('AdminUser');

		$result = $admin->select()
			->where('loginId = :loginId and loginPw = :loginPw')
			->params('loginId', $userid)
			->params('loginPw', loginPw)
			->fetchRow();

		if(!$result)
			return null;

		// 結果を作成し返却
		$ret = array(
			'loginId' => $result['loginId'],
			'userName' => $result['userName'],
			'loginedAt' => time()
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