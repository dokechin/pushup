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

		var pgclient = new Client({
			user: 'pushup',
			host: 'localhost',
			database: 'pushup',
			password: DB_PASSWORD,
			port: 5432
		})

		await pgclient.connect()

		if (req.method == 'POST'){
			const query = {
					text: `INSERT INTO setting (user_id, speed)
					VALUES ($1, $2)
					ON CONFLICT (user_id)
					DO UPDATE SET speed = $2`,
					values: [userId, req.headers.speed],
				}
			var res = await pgclient.query(query);
			await pgclient.end();		
			response.status(200);
		} else {
			const query = {
				text: `select speed from setting where user_id = $1`,
				values: [userId],
			}
			var res = await pgclient.query(query);
			var speed = 40;
			if (res.rows.length > 0){
				speed = res.rows[0].speed;
			}
			await pgclient.end();
			response.status(200).json({speed});
		}
	}
	catch (error) {
		console.log(error)
		response.sendStatus(500);
	}

};
module.exports = req;