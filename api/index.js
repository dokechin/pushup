const { BOT_ACCESS_TOKEN, DB_PASSWORD, LINE_CHANNEL_SECRET} = require('../config')
// パラメータ設定
const line_config = {
    channelAccessToken: BOT_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
var { Client } = require('pg');
var moment = require('moment-timezone');

const req = async function (req, res, next) {

	var pgclient = new Client({
		user: 'pushup',
		host: 'localhost',
		database: 'pushup',
		password: DB_PASSWORD,
		port: 5432
	})

	console.log(req.body);

	res.sendStatus(200);
};
module.exports = req;