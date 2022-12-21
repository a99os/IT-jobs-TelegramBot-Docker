require("dotenv").config();
const { Telegraf, Composer } = require("telegraf");
const composer = new Composer();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("hello", (ctx) => ctx.reply("Hello"));
bot.command("hipster", Telegraf.reply("λ"));
bot.launch().then(console.log("Bot ishga tushdi"));
bot.command("quit", async (ctx) => {
  console.log(ctx.message);
  // Explicit usage
  // await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  // await ctx.leaveChat();
});
bot.on("text", async (ctx) => {
  // Explicit usage
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.message.text}`
  );

  // Using context shortcut
  // await ctx.reply(`Hello ${ctx.state.role}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
