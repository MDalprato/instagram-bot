/*
Getting chat id in order to send message to a chat.
Just lunch this file and write something to the bot, it will print the chat id
*/
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

console.log(process.env.BOT_TOKEN);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, 'Your chatId is: ' + chatId);

});