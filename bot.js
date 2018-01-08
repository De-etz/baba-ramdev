var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');


bot.on('message', (msg) => {
    var txt = msg.text.toString().toLowerCase()
	var name = msg.from.first_name;
	
	if (txt.includes('hi') || txt.includes('namaste') || txt.includes('hey') || txt.includes('hello')) {
		bot.sendMessage(msg.chat.id, "Namaste,"+name+" Ji!");
	} 
    
});

module.exports = bot;
