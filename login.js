const { Context, session, Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const keyboard = Markup.inlineKeyboard([
  Markup.button.login("Login", "https://t.me/devjobs_itjobs_bot", {
    bot_username: "devjobs_itjobs_bot",
    request_write_access: true,
  }),
  Markup.button.url("❤️", "https://t.me/devjobs_itjobs_bot"),
  Markup.button.callback("Delete", "delete"),
]);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Hello", keyboard));
bot.action("delete", (ctx) => ctx.deleteMessage());

bot.launch();
