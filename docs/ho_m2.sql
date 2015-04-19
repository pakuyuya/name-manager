SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS entry;
DROP TABLE IF EXISTS entry_address;
DROP TABLE IF EXISTS entry_send;
DROP TABLE IF EXISTS membertype;
DROP TABLE IF EXISTS receipt;
DROP TABLE IF EXISTS sendtype;
DROP TABLE IF EXISTS send_itemtype;
DROP TABLE IF EXISTS send_label;
DROP TABLE IF EXISTS user;




/* Create Tables */

-- 名簿登記
CREATE TABLE entry
(
	id int NOT NULL AUTO_INCREMENT COMMENT '名簿情報id',
	create_at timestamp COMMENT '作成日',
	update_at timestamp COMMENT '更新日時',
	-- 0 : 未削除
	-- 1 : 削除済
	deleted tinyint COMMENT '削除フラグ : 0 : 未削除
1 : 削除済',
	entry_name_j varchar(256) COMMENT '登記名（日本語）',
	entry_name_j_kana varchar(256) COMMENT '登記名（日本語-カナ）',
	entry_name_e varchar(256) COMMENT '登記名（英語）',
	-- 別名。名前の検索候補
	entry_alias varchar(128) COMMENT '別名 : 別名。名前の検索候補',
	-- 検索条件用。
	entry_category1 varchar(128) COMMENT 'カテゴリ1 : 検索条件用。',
	-- 検索条件用。
	entry_category2 varchar(128) COMMENT 'カテゴリ２ : 検索条件用。',
	-- 0 : 個人
	-- 1 : 団体
	-- 2 : 賛助？
	entry_entity_type char COMMENT '登録対象区分 : 0 : 個人
1 : 団体
2 : 賛助？',
	send_type char COMMENT '発送区分',
	-- 文で書く場合あり。
	entry_tel1 varchar(128) COMMENT '電話番号１ : 文で書く場合あり。',
	-- 文で書く場合あり。
	entry_tel2 varchar(128) COMMENT '電話番号２ : 文で書く場合あり。',
	-- 文で書く場合あり。
	entry_tel3 varchar(128) COMMENT '電話番号３ : 文で書く場合あり。',
	-- 文で書く場合あり
	entry_fax varchar(128) COMMENT 'FAX番号 : 文で書く場合あり',
	-- 文で書く場合あり
	entry_mail1 varchar(255) COMMENT 'メールアドレス1 : 文で書く場合あり',
	-- 文で書く場合あり
	entry_mail2 varchar(255) COMMENT 'メールアドレス２ : 文で書く場合あり',
	-- 文で書く場合あり
	entry_url varchar(255) COMMENT 'URL : 文で書く場合あり',
	entry_countory varchar(128) COMMENT '国名',
	entry_rem_j text COMMENT '連絡備考（日本語）',
	entry_rem_e text COMMENT '連絡備考（英語）',
	send_address tinyint COMMENT '送付先住所',
	send_zip varchar(16) COMMENT '送付先郵便番号',
	-- 1:
	-- 2:
	-- 3:
	-- J:
	--
	entry_postalzone char COMMENT 'ポスタルゾーン : 1:
2:
3:
J:
',
	entry_officer_type char COMMENT '役員区分',
	-- 0 : 未加入
	-- 1 : 加入
	member_joined char COMMENT '会員加入フラグ : 0 : 未加入
1 : 加入',
	member_type char COMMENT '会員区分',
	member_name varchar(64) COMMENT '会員表記名',
	member_rem text COMMENT '会員備考',
	-- NULLの場合無期限
	send_expirate_at date COMMENT '送付期限日 : NULLの場合無期限',
	PRIMARY KEY (id)
) COMMENT = '名簿登記' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 名簿登記住所
CREATE TABLE entry_address
(
	id int NOT NULL AUTO_INCREMENT COMMENT '名簿登記住所id',
	create_at datetime COMMENT '作成日時',
	update_at timestamp COMMENT '更新日時',
	-- 0:未削除
	-- 1:削除済
	deleted char COMMENT '削除フラグ : 0:未削除
1:削除済',
	entry_id int NOT NULL COMMENT '登記名簿ID',
	entry_address_idx tinyint NOT NULL COMMENT '登記名簿住所表示順',
	entry_zip varchar(11) COMMENT '名簿登記郵便番号',
	entry_address varchar(255) COMMENT '名簿登記住所',
	-- 0 : 未選択
	-- 1 : 選択
	entry_address_selected char COMMENT '送付先選択フラグ : 0 : 未選択
1 : 選択',
	PRIMARY KEY (id)
) COMMENT = '名簿登記住所' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 発送
CREATE TABLE entry_send
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	create_at timestamp COMMENT '作成日時',
	update_at timestamp COMMENT '更新日時',
	-- 0: 未削除
	-- 1: 削除済み
	deleted char COMMENT '削除フラグ : 0: 未削除
1: 削除済み',
	send_num tinyint COMMENT '発送数',
	entry_id int COMMENT '名簿登記ID',
	-- 1: 発送
	-- 0: 一時停止
	send_state_code char COMMENT '発送状況コード : 1: 発送
0: 一時停止',
	send_rem text COMMENT '発送備考',
	-- 0: ひろば
	-- 1: Focus
	send_itemtype_cd char COMMENT '発送物種別 : 0: ひろば
1: Focus',
	PRIMARY KEY (id)
) COMMENT = '発送' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 会員種別
CREATE TABLE membertype
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	membertype_cd char NOT NULL COMMENT '会員種別コード',
	create_at timestamp COMMENT '作成日',
	update_at timestamp COMMENT '更新日',
	membertype_name_j varchar(16) COMMENT '会員種別名（日本語）',
	membertype_name_e varchar(16) COMMENT '会員種別名（英）',
	PRIMARY KEY (id)
) COMMENT = '会員種別' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 料金受領
CREATE TABLE receipt
(
	id int NOT NULL AUTO_INCREMENT COMMENT '受領id',
	create_at timestamp COMMENT '作成日',
	updat_at timestamp COMMENT '更新日',
	deleted int COMMENT '削除フラグ',
	entry_id int COMMENT '名簿登記id',
	receiptdate date COMMENT '受領日',
	-- 0:会費
	-- 1:購読料
	receipt_type char COMMENT '受領名目種別 : 0:会費
1:購読料',
	recipt_rem time COMMENT '受領備考',
	PRIMARY KEY (id)
) COMMENT = '料金受領' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 発送種別
CREATE TABLE sendtype
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	sendtype_cd char NOT NULL COMMENT '発送種別コード',
	sendtype_name_j varchar(16) COMMENT '発送種別名（日本語）',
	sendtype_name_e varchar(16) COMMENT '送信種別名（英語）',
	create_at timestamp COMMENT '作成日時',
	update_at timestamp COMMENT '更新日時',
	PRIMARY KEY (id)
) COMMENT = '発送種別' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 発送項目種別
CREATE TABLE send_itemtype
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	senditemtype_cd char NOT NULL COMMENT '発送種別ID',
	senditemtype_name_j varchar(32) NOT NULL COMMENT '発送項目種別名（日本語）',
	senditemtype_name_e varbinary(32) COMMENT '発送項目種別名（英語）',
	PRIMARY KEY (id)
) COMMENT = '発送項目種別' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


-- 発送ラベル
CREATE TABLE send_label
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	sendtype_cd char NOT NULL COMMENT '送付種別コード',
	create_at timestamp COMMENT '作成日時',
	update_at timestamp COMMENT '更新日時',
	sendtype_name varchar(16) COMMENT '送付種別名',
	PRIMARY KEY (id)
) COMMENT = '発送ラベル';


-- ユーザー
CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	create_at timestamp COMMENT '作成日時',
	update_at timestamp COMMENT '更新日時',
	login_id varchar(32) COMMENT 'ログインID',
	login_pw varchar(32) COMMENT 'ログインパスワード',
	user_name varchar(64) COMMENT 'ユーザー名',
	PRIMARY KEY (id)
) COMMENT = 'ユーザー';



/* Create Indexes */

CREATE INDEX entry_address_idx01 ON entry_address (entry_id ASC, entry_address_idx ASC);
CREATE INDEX recipt_idx_01 ON receipt (entry_id ASC, receiptdate DESC);


