const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const { BOT_ACCESS_TOKEN, DB_PASSWORD, LINE_CHANNEL_SECRET} = require('../config')
// パラメータ設定
const line_config = {
    channelAccessToken: BOT_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
var { Client } = require('pg');
var moment = require('moment-timezone');
const QUERY_TYPE = new Map([
	["今年", "year"],
	["今月", "month"],
	["今週", "week"],
	["今日", "tday"],
  ]);
  

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

const botReq = async function (req, res, next) {
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

	var pgclient = new Client({
		user: 'pushup',
		host: 'localhost',
		database: 'pushup',
		password: DB_PASSWORD,
		port: 5432
	})

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
		// この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
		console.log(event)
        if (event.type == "message" && event.message.type == "text"){
			// ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
			var target = event.message.text.trim();
            if (target == "今年" || target == "今月" || target == "今週" || target == "今日"){
				pgclient.connect()
				var firstDay = new moment().startOf(QUERY_TYPE.get(target)).tz('Asia/Tokyo').format();
				var lastDay = new moment().endOf(QUERY_TYPE.get(target)).tz('Asia/Tokyo').format();
				console.log(firstDay)
				console.log(lastDay)
				const query = {
				  text: 'SELECT menu.menu as menu,SUM(train.COUNT) as count FROM TRAIN inner join menu on train.menu_id = menu.menu_id WHERE train.execute_date between $1 and $2 and train.user_id = $3 group by menu.menu',
				  values: [firstDay, lastDay, event.source.userId],
				}
				pgclient.query(query, (err, res) => {
					if (err) {
						console.log(err)
					} else {
						console.log(res.rows);
						var text = target + "の集計結果 \uDBC0\uDCB4\n";
						// replyMessage()で返信し、そのプロミスをevents_processedに追加。
						for (var i=0;i<res.rows.length;i++){
							text = text + res.rows[i].menu + " " + res.rows[i].count + "回\n"
						}
						events_processed.push(bot.replyMessage(event.replyToken, {
							type: "text",
							text: text
						}));
					}
					pgclient.end()
				})
			} else if (target == "グラフ") {
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "line://app/1566355119-GKL744J3"
                }));
			} else {
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "「今年」「今月」「今週」「今日」で対象期間の集計をします。「グラフ」でグラフ表示します。"
                }));
			}
        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
	);
};
module.exports = botReq;