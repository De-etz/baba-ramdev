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
    
	var Hi = "hi";
	if (msg.text.toString().toLowerCase().includes(Hi) === 0) {
		bot.sendMessage(msg.chat.id,"Hello dear user");
	} 
    
});

module.exports = bot;
