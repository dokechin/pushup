const axios = require('axios')
const { DOMAIN, ExtensionId, DEBUG ,BOT_ACCESS_TOKEN, DB_PASSWORD} = require('../config')
var { Client } = require('pg');
var moment = require('moment-timezone');
var {MENU_TYPE} = require('../model/menu.js');

const req = async function (req, response, next) {

	if (!req.headers.accesstoken) {
		response.sendStatus(401);
		return;
	}

	try {
		const accessToken = req.headers.accesstoken;
		console.log("accessToken=" + accessToken);
		const url = `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`;
	
		var req1 = await axios.get(url);
		if (!req1.data.scope) {
			console.log("!req.data.scope");
			response.sendStatus(500);
			return;
		}
		var req2 = await axios({
			method: "GET",
			url: 'https://api.line.me/v2/profile',
			headers: {
			  'Authorization': `Bearer ${accessToken}`
			}
		});
		var userId = req2.data.userId;
		console.log(`userID= ${userId}`)
		console.log(req.headers.start);
		console.log(req.headers.end);
		console.log(req.headers.mode);

//		host: '49.212.196.217',

		var pgclient = new Client({
			user: 'pushup',
			host: 'localhost',
			database: 'pushup',
			password: DB_PASSWORD,
			port: 5432
		})

		await pgclient.connect()

		var firstDay = (req.headers.start)? moment(req.headers.start, 'YYYY-MM-DD') : new moment().startOf("month");
		var lastDay = (req.headers.end)? moment(req.headers.end, 'YYYY-MM-DD') : new moment().endOf("month");

		var mode = (req.headers.mode)? req.headers.mode : "day";
		var format = (mode == "day") ? "YYYY-MM-DD" : 'YYYY-MM';
		if (mode == "month"){
			firstDay.startOf("month");
			lastDay.endOf("month");
		}

		var dates = [];
		var sum = {};
		for (var [key, value] of MENU_TYPE) {
			sum[key] = [];
		}

		var count = 0;
		for (var day = firstDay.clone();day <= lastDay; day = day.add(1, mode)){

			console.log("day=" + day.format())
			const query = {
				text: `select menu.menu, sum(count) as count
						from train
						inner join menu
						on train.menu_id = menu.menu_id
						where execute_date between $1 and $2 and user_id = $3
						group by menu.menu`,
				values: [day, day.clone().endOf(mode), userId],
			}
			var res = await pgclient.query(query);

			dates.push(day.clone().format(format));
			for (var i=0;i<res.rows.length;i++){
				sum[res.rows[i].menu].push(parseInt(res.rows[i].count))
			}
			for (var [key, value] of MENU_TYPE) {
				if (sum[key].length == count){
					sum[key].push(0)
				}
			}
			count++;	
		}
		await pgclient.end();
		var data = {dates: dates, sum :sum, start: firstDay.format('YYYY-MM-DD'), end :lastDay.format('YYYY-MM-DD')};
		console.log(data)
		
		response.status(200).json(data);
	}
	catch (error) {
		console.log(error)
		response.sendStatus(500);
	}

};
module.exports = req;