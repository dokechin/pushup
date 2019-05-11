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
    await this.pgclient.connect()
    var firstDay = new moment().subtract(1,'months').startOf('month').tz('Asia/Tokyo').format();
    var lastDay = new moment().subtract(1,'months').endOf('month').tz('Asia/Tokyo').format();
    for(const[menu, menu_id] of MENU_TYPE) {

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

        const query2 = {
          text: `insert into summary values($1,$2,$3,$4)`,
          values: [firstDay, menu_id, res2.rows[0].avg, res2.rows[0].std],
        }
        console.log(query2);
        var res2 = await this.pgclient.query(query2);
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