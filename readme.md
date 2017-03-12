# 名簿管理システム


## 1. プロジェクトについて

 * 名簿管理システムです。


## 2. 言語 / ライブラリ等

* PHP
  * PHP 5.1以上
  * MVCフレームワーク：Curry PHP（同梱）
  * テンプレート　　 ：Smarty（同梱）

* TypeScript
  * AltJSとしてTypeScriptを採用
  * ver >= 2.1
  * Angularjs
  * jQuery

* CSS
  * Sass / Compassを採用

* ビルドシステム
  * gulpを採用

* データベース
  * MySQL 5.1


## 3. 開発環境について

 * ~~Eclipse 4.4~~ IntelliJ IDEA
 
 * ~~ERMaster~~ 廃止
 
 * Node.js

## 4. 開発のために必要なもの

  * Node.js　http://nodejs.jp/

  * Gulp
  * TypeScript

Node.jsパッケージインストールコマンドまとめ
```
npm install -g gulp
npm install -g typescript
```

  * Ruby https://www.ruby-lang.org/ja/

  * Sass
  * Compass

Rubyパッケージインストールコマンドまとめ
```
gem update --system
gem install sass
gem install compass
```


## 5. コンパイル / 実行

* コンパイル用に gulp モジュールをインストール
  * ```(プロジェクト)/gulp``` に移動し、```npm install``` (かなり時間かかります。）

* コンパイル
  * ```gulp build``` 実行
  * Webルートに置くファイル・ディレクトリが /build にコピーされます。
* 時々失敗します。。（削除時に排他ロックがかかってるところへコピーするため）もう一度実行すると正常終了することが多いです。

## 6. ディレクトリ構成

### 全体の構成

```
hurights-meibo2
├ build   配備対象が作成されるディレクトリ（gulpにより設定）
├ doc     ドキュメント
├ gulp    gulpのビルドスクリプト
└ src     開発ソース
　├ main　　開発用ソース
  ｜ ├ curry  CurryPHP本体
  ｜ ├ html   Angularテンプレート
  ｜ ├ images 画像
  ｜ ├ lib    JavaScript/CSS ベンダーライブラリ
  ｜ ├ sass   Compassファイル
  ｜ ├ site   PHP実装。CurryPHPの実装に従う
  ｜ ├ ts     Typescriptファイル
  ｜ ｜ ├ app   実装
  ｜ ｜ └ lib   ベンダーライブラリ
  ｜ ├ .htaccess   CurryPHPにあわせたApacheのアクセス制御ファイル
  ｜ └ index.php   CurryPHPエントリポイント
  └ test    テスト用ソース
```

### Typescriptの構成

```
hurights-meibo2
└ src     開発ソース
　└ main　　開発用ソース
  　 └ ts     Typescriptファイル
  　 　 └ app   実装
　　　　　 ├  app         エントリポイント。各画面で<script src="...">参照する
　　　　 　├  directives  Angular Directive集
　　　 　　├  resources   Angular Resource集
           ├  services    Angular Service集
           └  common      雑多な共通コンポーネント
```

### PHPの構成

```
hurights-meibo2
└ src     開発ソース
　└ main　　開発用ソース
  　 ├ curry   CurryPHP本体
     └ site    開発用ソース
  　 　 ├ app
　　　　｜ ├  controllers  コントローラ
　　　　｜ ├  models       モデル
        ｜ ├  services     サービス
        ｜ └  views        テンプレート
        ├ configs 設定ファイル
        ｜ ├ app.ini       独自追加した、アプリケーション設定一括保持ファイル
        ｜ ├ curry.ini     CurryPHP 全体設定ファイル
        ｜ ├ database.ini  Database ファイル
        ｜ └ routing.ini   ルーティングファイル
        ├ library    PHPライブラリ。ベンダー、独自追加含む
        ├ logs       アプリケーションログ。エラーなどはここに吐かれる。
        └ .htaccess  require all denied
```
