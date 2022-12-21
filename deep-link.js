// https://core.telegram.org/bots#deep-linking
require("dotenv").config();

const { Context, Telegraf, Telegram } = require("telegraf");

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`));

bot.launch();