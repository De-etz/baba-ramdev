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
    var txt = msg.text.toString().toLowerCase()
	var firstname = msg.from.first_name;
	
	
	
	if (txt.includes('hi') || txt.includes('namaste') || txt.includes('hey') || txt.includes('hello')) {
		if (txt.includes('baba') || txt.includes('ramdev') || txt.includes('terimaabot')) {
			bot.sendMessage(msg.chat.id, "Namaste, "+firstname+" Ji.");
		}
	} else if (txt === slap) {
		bot.sendMessage("Yo");
	}
    
});

bot.onText(/\/slap/, (msg) => {

	bot.sendMessage("Hi");
    
});


module.exports = bot;
