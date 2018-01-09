var plug = './plugins/';
var token = process.env.TOKEN;

var slapper = require(plug+'slap.js');

var Bot = require('node-telegram-bot-api');
var bot;

// var intro = 0;

if(process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, { polling: true });
}

// if (intro == 0) {
	// bot.sendMessage(msg.chat.id, "Baba Ramdev updated succesfully.");
	// intro = 1;
// }

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

var slap = '/slap';

bot.on('message', (msg) => {
	try {
    var txt = msg.text.toString().toLowerCase()
	var firstname = msg.from.first_name;
	
	
	
	if (txt.includes('hi') || txt.includes('namaste') || txt.includes('hey') || txt.includes('hello')) {
		if (txt.includes('baba') || txt.includes('ramdev') || txt.includes('terimaabot')) {
			bot.sendMessage(msg.chat.id, "Namaste, "+firstname+" Ji.");
		}
	} else if (txt === slap) {
		bot.sendMessage("Yo");
	}
    } catch (err) {
		bot.sendMessage(msg.chat.id, 'Error: ' + err.message);
	}
});

// bot.onText(/\/displayInfo, (msg) => {
	// bot.sendMessage(msg.chat.id, JSON.stringify(msg));
// }

bot.onText(/\/slap/, (msg) => {
	try {
		bot.sendMessage(msg.chat.id, slapper.generateSlap(msg.from.first_name, msg.reply_to_message.from.first_name),{parse_mode : "HTML"});
    } catch (err) {
		bot.sendMessage(msg.chat.id, 'Error: ' + err.message);
	}
});


module.exports = bot;
