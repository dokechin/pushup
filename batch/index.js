"use strict";
const { DOMAIN, ExtensionId, DEBUG ,BOT_ACCESS_TOKEN, DB_PASSWORD} = require('../config')
const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: BOT_ACCESS_TOKEN //Messaging APIのアクセストークン
});
var { Client } = require('pg');
var {MENU_TYPE} = require('../model/menu.js');
var moment = require('moment-timezone');
var math = require('math');


class Batch {
  constructor () {
    this.pgclient = new Client({
      user: 'pushup',
      host: 'localhost',
      database: 'pushup',
      password: DB_PASSWORD,
      port: 5432
    })
  }
  async execute(){
    var rank = {};
    var sta = {};
    await this.pgclient.connect()
    var firstDay = new moment().subtract(1,'months').startOf('month').tz('Asia/Tokyo').format();
    var lastDay = new moment().subtract(1,'months').endOf('month').tz('Asia/Tokyo').format();
    for(const[menu, menu_id] of MENU_TYPE) {

      const query = {
        text: `select *
        from (
            select menu_id,user_id, count,
                rank() over(
                    partition by menu_id
                    order by count desc
                ) as rn
            from (
                select
                    menu_id,user_id,
                    sum(count) as count
                from train
                where execute_date between $1 and $2 and menu_id = $3
                group by 1,2
            ) s
        ) s
        where rn <= 10
        order by menu_id, rn asc`,
        values: [firstDay,lastDay,menu_id],
      }
      var res = await this.pgclient.query(query);
      if (res && res.rows.length > 0){
        rank[menu] = res.rows;
      }

      const query2 = {
        text: `select min(s.menu), round(avg(s.count)) as avg, round(stddev(s.count)) as std
            from (
                select
                    menu.menu,user_id,
                    sum(count) as count
                from train
                inner join menu
                on train.menu_id = menu.menu_id
                where execute_date between $1 and $2 and train.menu_id = $3
                group by 1,2
            ) s`,
        values: [firstDay, lastDay, menu_id],
      }
      var res2 = await this.pgclient.query(query2);
      if (res2 && res2.rows.length > 0){
        sta[menu] = {avg : res2.rows[0].avg, std : res2.rows[0].std};
      }
    }

    const query2 = {
      text: `select * from (
              select user_id,menu.menu_id,menu.menu,sum(count) count
              from train
              inner join menu
              on menu.menu_id = train.menu_id
              where execute_date between $1 and $2 
              group by user_id,menu.menu_id) s
              order by user_id, menu_id`,
      values: [firstDay, lastDay],
    }
    var res2 = await this.pgclient.query(query2);
    if (res2.rows.length == 0){
      this.pgclient.end()
      return;
    }

    var bMonth = new moment().subtract(1,'months')
    var text = bMonth.year() + "年" + (bMonth.month() + 1 ) + "月の成績発表 \uDBC0\uDCB4 \n";
    for(var i=0;i<res2.rows.length;i++){

      var avg = sta[res2.rows[i].menu].avg;
      var std = sta[res2.rows[i].menu].std;
      var t = math.round((10 * (res2.rows[i].count - avg) / std) + 50);

      text = text + res2.rows[i].menu + " 参加者平均 " + avg + "回 標準偏差" + std + "\n";

      text = text + "あなた " + res2.rows[i].count + "回 ";
      text = text + "偏差値 " + t;

      for (var j=0;j<rank[res2.rows[i].menu].length;j++){
        if (res2.rows[i].user_id == rank[res2.rows[i].menu][j].user_id){
          text = text + " (" + rank[res2.rows[i].menu][j].rn+ "位 入賞 \uDBC0\uDC73 )";
        }
      }

      text = text + "\n\n";

      if (i == (res2.rows.length - 1) || res2.rows[i].user_id != res2.rows[i+1].user_id){
        console.log(text)
/*        client.pushMessage(res2.rows[i].user_id, {
          type: 'text',
          text: text
        });*/
        text = bMonth.year() + "年" + (bMonth.month() + 1 ) + "月の成績発表 \uDBC0\uDCB4 \n";
      }
    }
    this.pgclient.end()
    return;
  }
}

async function main(){
var batch = new Batch();
 await batch.execute();
 console.log("end")
}

main();