SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Indexes */

DROP INDEX idx_entry_receipt_receiptdate ON entry_receipt;
DROP INDEX entry_id ON entry_send;



/* Drop Tables */

DROP TABLE IF EXISTS admin_user;
DROP TABLE IF EXISTS entry_receipt;
DROP TABLE IF EXISTS entry_send;
DROP TABLE IF EXISTS entry;




/* Create Tables */

CREATE TABLE admin_user
(
	-- id
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	-- ログインID
	login_id varchar(32) NOT NULL COMMENT 'ログインID',
	-- ログインパスワード
	login_pw varchar(32) NOT NULL COMMENT 'ログインパスワード',
	-- ユーザー名
	user_name varchar(64) NOT NULL COMMENT 'ユーザー名',
	create_at datetime NOT NULL,
	update_at timestamp NOT NULL,
	PRIMARY KEY (id)
) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;


CREATE TABLE entry
(
	-- 名簿情報id
	id int NOT NULL AUTO_INCREMENT COMMENT '名簿情報id',
	-- 登記名（日本語）
	entry_name_j varchar(256) NOT NULL COMMENT '登記名（日本語）',
	-- 登記名（日本語-カナ）
	entry_name_j_kana varchar(256) NOT NULL COMMENT '登記名（日本語-カナ）',
	-- 登記名（英語）
	entry_name_e varchar(256) NOT NULL COMMENT '登記名（英語）',
	-- 名前の検索候補
	entry_alias varchar(128) NOT NULL COMMENT '名前の検索候補',
	-- 検索補助項目
	entry_category1 varchar(128) NOT NULL COMMENT '検索補助項目',
	-- 検索補助項目
	entry_category2 varchar(128) NOT NULL COMMENT '検索補助項目',
	-- 0 : 個人
	-- 1 : 団体
	-- 2 : 賛助？
	entry_entity_type char NOT NULL COMMENT '0 : 個人
1 : 団体
2 : 賛助？',
	-- メモ的な文字列が入る可能性あり
	entry_tels text NOT NULL COMMENT 'メモ的な文字列が入る可能性あり',
	-- メモ的な文字列が入る可能性あり
	entry_fax varchar(128) NOT NULL COMMENT 'メモ的な文字列が入る可能性あり',
	-- メモ的な文字列が入る可能性あり
	entry_mail text NOT NULL COMMENT 'メモ的な文字列が入る可能性あり',
	-- メモ的な文字列が入る可能性あり
	entry_url varchar(255) NOT NULL COMMENT 'メモ的な文字列が入る可能性あり',
	-- 国名
	entry_countory varchar(128) NOT NULL COMMENT '国名',
	-- 連絡備考（日本語）
	entry_rem_j text NOT NULL COMMENT '連絡備考（日本語）',
	-- 連絡備考（英語）
	entry_rem_e text NOT NULL COMMENT '連絡備考（英語）',
	entry_address text NOT NULL,
	-- ポスタルゾーン : 1:
	-- 2:
	-- 3:
	-- J:
	-- 
	entry_postalzone char NOT NULL COMMENT 'ポスタルゾーン : 1:
2:
3:
J:
',
	-- 役員区分
	entry_officer_type char NOT NULL COMMENT '役員区分',
	-- 0 : 未加入
	-- 1～：いずれかのタイプ
	membertype_id char NOT NULL COMMENT '0 : 未加入
1～：いずれかのタイプ',
	-- 会員表記名
	member_name varchar(64) NOT NULL COMMENT '会員表記名',
	-- 会員備考
	member_rem text NOT NULL COMMENT '会員備考',
	-- NULLの場合、会員設定なし or 無期限
	member_expire_on date COMMENT 'NULLの場合、会員設定なし or 無期限',
	-- NULLの場合無期限
	send_expire_on date COMMENT 'NULLの場合無期限',
	entry_termid tinyint NOT NULL,
	entry_term varchar(32) NOT NULL,
	entry_label text,
	create_at timestamp NOT NULL,
	update_at timestamp NOT NULL,
	PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE entry_receipt
(
	-- 受領id
	id int NOT NULL AUTO_INCREMENT COMMENT '受領id',
	-- 名簿登記id
	entry_id int NOT NULL COMMENT '名簿登記id',
	-- 受領日
	receiptdate date NOT NULL COMMENT '受領日',
	-- 受領名目種別 : 0:会費
	-- 1:購読料
	receipt_type char NOT NULL COMMENT '受領名目種別 : 0:会費
1:購読料',
	-- 受領備考
	receipt_rem time NOT NULL COMMENT '受領備考',
	create_at timestamp NOT NULL,
	update_at timestamp NOT NULL,
	PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE entry_send
(
	-- id
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	-- 名簿情報id
	entry_id int NOT NULL COMMENT '名簿情報id',
	send_num tinyint NOT NULL,
	-- 1 = ひろば
	-- 2 = FOCUS
	id_send_item int NOT NULL COMMENT '1 = ひろば
2 = FOCUS',
	sendtype_id tinyint NOT NULL,
	send_rem text NOT NULL,
	-- 1: 発送
	-- 0: 一時停止
	send_enabled int NOT NULL COMMENT '1: 発送
0: 一時停止',
	-- 作成日時
	create_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '作成日時',
	update_at timestamp DEFAULT '0000-00-00 00:00:00' NOT NULL,
	PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



/* Create Foreign Keys */

ALTER TABLE entry_receipt
	ADD CONSTRAINT receipt_ibfk_1 FOREIGN KEY (entry_id)
	REFERENCES entry (id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
;


ALTER TABLE entry_send
	ADD CONSTRAINT entry_send_ibfk_1 FOREIGN KEY (entry_id)
	REFERENCES entry (id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
;



/* Create Indexes */

CREATE INDEX idx_entry_receipt_receiptdate USING BTREE ON entry_receipt (receiptdate ASC);
CREATE INDEX entry_id USING BTREE ON entry_send (entry_id ASC);



