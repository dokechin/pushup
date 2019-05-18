CREATE SCHEMA pushup AUTHORIZATION pushup;
CREATE TABLE pushup.menu (
	menu varchar(50) NOT NULL,
	menu_id int4 NOT NULL,
	CONSTRAINT menu_pk PRIMARY KEY (menu_id)
);

INSERT INTO pushup.menu
(menu, menu_id)
VALUES('プッシュアップ', 1);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('シットアップ', 2);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('バックエクステンション', 3);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('スクワット', 4);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('クランチ', 5);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('バックキック', 6);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('ヒップリフト', 7);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('レッグレイズ', 8);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('カーフレイズ', 9);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('ランジ', 10);
INSERT INTO pushup.menu
(menu, menu_id)
VALUES('チンニング', 11);

CREATE TABLE pushup.train (
	execute_date timestamp with time zone NOT NULL,
	menu_id int4 NOT NULL,
	count int4 NOT NULL,
	speed int4 NOT NULL,
	user_id varchar(100) NOT NULL
);
CREATE INDEX train_user_id_idx ON pushup.train (user_id,execute_date);

CREATE TABLE pushup.summary (
	execute_date timestamp with time zone NOT NULL,
	menu_id int4 NOT NULL,
	average int4 NOT NULL,
	std int4
);
CREATE INDEX summary_execute_date_idx ON pushup.summary(execute_date);

CREATE TABLE pushup.setting (
	user_id varchar(100) NOT NULL primary key,
	speed int4 NOT NULL
);
