###########################################################
# ヒューライツ大阪　名簿システム ver2
#
###########################################################

■ 1. プロジェクトについて

	ヒューライツ大阪　名簿管理システムの新規システムです。


■ 2. 言語 / ライブラリ等

□PHP
	・PHP 5.1以上
	・MVCフレームワーク：Curry PHP（同梱）
	・テンプレート　　 ：Smarty（同梱）

□JavaScript
	・AltJSとしてTypeScriptを採用
	・Backboneベース
	・jQuery

□CSS
	・Sass / Compassを採用

□ビルドシステム
	・gulpを採用

□MySQL 5.1


■ 3. 開発環境について

□Eclipse 4.4

□ER Master

□Node.js

・以下インストール必須です。

	・Node.js　http://nodejs.jp/

	・Gulp
	・Gulp-typescript
	・TypeScript

Node.jsのパッケージインストールコマンドまとめ
-----------------------------------------
npm install -g gulp
npm install -g typescript
npm install -g gulp-typescript
-----------------------------------------

□Ruby

・以下インストール必須です。

	・Ruby https://www.ruby-lang.org/ja/

	・Sass
	・Compass


Rubyのパッケージインストールコマンドまとめ
-----------------------------------------
gem update --system
gem install sass
gem install compass
-----------------------------------------


■ 4. コンパイル / 実行

□コンパイル
・/gulp/compile.batを実行。
・Webルートに置くファイル・ディレクトリが /build にコピーされます。
・時々失敗します。。（削除時に排他ロックがかかってるところへコピーするため）もう一度実行すると正常終了することが多いです。
