console.log("____ Bot is running ____");

require('dotenv').load();

// const request = require('request');
// const FP = require('functional-promise');
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
};

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var WEATHERDATA;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());


bot.on('message', function(message) {
	const prefix = '!';
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!bot.commands.has(command)) return;

	var superObj = [];
	var selection;

	if (command == "snow") {
		selection = args[0];
		// fetchSnowData();
	};

	function fetchSnowData() {
		console.log("fetching snow data...");
		let snowUrl = 'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=251&language=en&pagetype=skireport&direction=+1'
		fetch(snowUrl)
		.then(res => res.json())
		.then(sortWeather)
		.catch()
	};

	function sortWeather(res) {
		let resorts = res.rows;
	  for (var i = 0; i < resorts.length; i++) {
			let singleResortName = resorts[i].resort_name.toLowerCase().replace(/ /g,'');
			resObj = {};
			resObj.resortName = singleResortName;
	    resObj.threeDayTotal = Math.round(resorts[i].pastSnow.sum3/2.54 || 0);
	    resObj.lastDayTotal = Math.round(resorts[i].pastSnow.snow0day/2.54);
	    resObj.liftNum =  (resorts[i].snowcone.lifts_open === null) ? 0 :
												 resorts[i].snowcone.lifts_open;
	    resObj.liftTotal = resorts[i].resortProfile.num_lifts;
	    resObj.baseDepth = Math.round(resorts[i].snowcone.base_depth_cm/2.54);
	    resObj.topDepth = Math.round(resorts[i].snowcone.top_depth_cm/2.54);
			superObj.push(resObj);
	  }
		console.log("state being saved...");
		saveState();
	};

	function saveState() {
		console.log("saveState function");
		fs.writeFile('snowData-state.json', JSON.stringify(superObj, null, 4), function(err) {
			console.log('File successfuly written!!!');
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

	if (command.args && !args.length) {
		return message.channel.send(
`You didn't provide any arguments,
${message.author}! \n
Type ** !snow all ** to see all snow reports \n
Type ** !snow keystone ** to see a specific resort, keystone in this example \n
Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands \n`)
	}

	try {

		if (command === 'snow' && args[0].toLowerCase() != 'all') {
			selection = args[0].toLowerCase();
			const getFSData = async () => {
				var snow = require('./snowData-state.json');
				let resorts = snow.filter((obj) => {
						console.log(obj.resortName);
						return obj.resortName.includes(selection);
				});
				const snowData = await resorts[0];
				// console.log("input: ", selection);
				// console.log(snowData);
				const mess = await bot.commands.get(command).execute(message, args, snowData)
				return mess;
				};
			getFSData();
		} else if (command === 'snow' && args[0].toLowerCase() == 'all') {
			selection = args[0].toLowerCase();
			const getFSData = async () => {
				var snow = require('./snowData-state.json');
				const snowData = await snow;
				// console.log("input: ", selection);
				// console.log(snowData);
				const mess = await bot.commands.get(command).execute(message, args, snowData)
				return mess;
				};
			getFSData();
		} else {
			bot.commands.get(command).execute(message, args);
		}
	}

	catch (error) {
		console.error(error);
		message.reply('there was an error with that command, BRO!');
	}

});

bot.login(TOKEN);

const port = 3000;
app.listen(port, () => {
  console.log('listening on port ', port);
});
