require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const chatId = process.env.BOT_CHAT_ID;

function sendTelegramMessage(message) {
    bot.sendMessage(chatId, message);
};

module.exports.sendTelegramMessage = sendTelegramMessage;

