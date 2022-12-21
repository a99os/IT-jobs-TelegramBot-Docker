/* eslint-disable @typescript-eslint/no-floating-promises */
require("dotenv").config();

const { Context, Telegraf, Telegram } = require("telegraf");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

class CustomContext extends Context {
  constructor(update, telegram, botInfo) {
    console.log("Creating context for %j", update);
    super(update, telegram, botInfo);
  }

  reply(...args) {
    console.log("reply called with args: %j", args);
    return super.reply(...args);
  }
}

const bot = new Telegraf(token, { contextType: CustomContext });
bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("Help message"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
