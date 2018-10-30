console.log("____ Bot is running ____");

require('dotenv').load();

// const request = require('request');

//discord stuff
const fs = require('fs');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const TOKEN = process.env.TOKEN;
const accountId = process.env.ACCOUNT_ID;
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandLib = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of commandLib) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
//server stuff
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var WEATHERDATA;


//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

////////////////////////////////////////////


////////////////////////////////////////////

// bot.on('message', function(message) {
// 	if (message.author == bot.user) {
// 		return
// 	} else {
//   	if (message.content === '!commands') {
//     message.reply("!latest");
//     message.reply("!help");
//     message.reply("!twitter");
//   	}
// 	}
// });
bot.on('message', function(message) {
	const prefix = '!';
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!bot.commands.has(command)) return;

	// if (!args.length) {
	// 	return message.channel.send(`You didn't provide any arguments,
	// 				${message.author}!`);
	// }

	var superObj = {};
	var selection;
	if (command == "snow") {
		selection = args[0];
		fetchSnowData();
	}

	function fetchSnowData() {
		console.log("fetching snow data...");
		let snowUrl = 'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=251&language=en&pagetype=skireport&direction=+1'
		fetch(snowUrl)
		.then(res => res.json())
		.then(sortWeather)
		.catch()
	}

	function sortWeather(res) {
  // let resorts = res.rows.map((row) => {
  //   // return row['resort_name'].toLowerCase().replace(/ /g,'') == selection
	// 	 return row['resort_name'].toLowerCase().replace(/ /g,'')
  // });
	let resorts = res.rows;
  for (var i = 0; i < resorts.length; i++) {
		let singleResortName = resorts[i].resort_name;
		console.log(singleResortName);
		resObj = {};
		// console.log("single resort...: ", superObj);
		resObj.resortName = singleResortName;
    resObj.threeDayTotal = Math.round(resorts[i].pastSnow.sum3/2.54 || 0);
    resObj.lastDayTotal = Math.round(resorts[i].pastSnow.snow0day/2.54);
    resObj.liftNum =  (resorts[i].snowcone.lifts_open === null) ? 0 :
											 resorts[i].snowcone.lifts_open;
    resObj.liftTotal = resorts[i].resortProfile.num_lifts;
    resObj.baseDepth = Math.round(resorts[i].snowcone.base_depth_cm/2.54);
    resObj.topDepth = Math.round(resorts[i].snowcone.top_depth_cm/2.54);
		superObj[singleResortName.toLowerCase().replace(/ /g,'')] = resObj;
  	}
		saveState(), getState();
		// findResort();
	};



	function saveState() {
		console.log("saveState function");
		fs.writeFile('snowData-state.json', JSON.stringify(superObj, null, 4), function(err) {
			console.log('File successfuly written!!!');
			// setTimeout(saveState, superObj, 3600000);
		});
	}

	function getState() {
		fs.readFile('snowData-state.json', 'utf8', function(err, data) {
			if (err) throw err;
			let myObj = JSON.parse(data);
			return myObj;
			// console.log(Object.values(myObj['vail']));
		})
	}

	// function findResort() {
	// 	fs.readFile('snowData-state.json', 'utf8', function(err, data) {
	//
	// 		let myObj = JSON.parse(data);
	//
	// 		for (var key in myObj) {
	// 			if (key == selection) {
	// 				console.log("it matches!!!!");
	// 				WEATHERDATA = myObj[key];
	// 			}
	// 		}
	// 		console.log("selected weather!! ", selection, WEATHERDATA);
	// 	})
	// }

	if (command.args && !args.length) {
		return message.channel.send(
`You didn't provide any arguments,
${message.author}! \n
Type ** !snow all ** to see all snow reports \n
Type ** !snow keystone ** to see a specific resort, keystone in this example \n
Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands \n`)
	}

	try {
		if (command === 'snow') {
			let snowData = getState();
			bot.commands.get(command).execute(message, args, snowData);
		} else {
			bot.commands.get(command).execute(message, args);
		}
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error with that command, BRO!');
	}
})



bot.login(TOKEN);


const port = 3000;
app.listen(port, () => {
  console.log('listening on port ', port);
})
