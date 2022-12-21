const { Context, session, Telegraf } = require("telegraf");
require("dotenv").config();

const { reply, fork } = Telegraf;

const randomPhoto = "https://picsum.photos/200/300/?random";

const sayYoMiddleware = fork((ctx) => ctx.reply("yo"));

const bot = new Telegraf(process.env.BOT_TOKEN);

// Register session middleware
bot.use(session());

// Register logger middleware
bot.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log("response time %sms", ms);
  });
});

// Login widget events
bot.on("connected_website", (ctx) => ctx.reply("Website connected"));

// Telegram passport events
bot.on("passport_data", (ctx) => ctx.reply("Telegram passport connected"));

// Random location on some text messages
bot.on("text", (ctx, next) => {
  if (Math.random() > 0.2) {
    return next();
  }
  return Promise.all([
    ctx.replyWithLocation(Math.random() * 180 - 90, Math.random() * 180 - 90),
    next(),
  ]);
});

// Text messages handling
bot.hears("Hey", sayYoMiddleware, (ctx) => {
  ctx.session ??= { heyCounter: 0 };
  ctx.session.heyCounter++;
  return ctx.replyWithMarkdown(`_Hey counter:_ ${ctx.session.heyCounter}`);
});

// Command handling
bot.command("answer", sayYoMiddleware, (ctx) => {
  console.log(ctx.message);
  return ctx.replyWithMarkdownV2("*42*");
});

bot.command("cat", (ctx) => ctx.replyWithPhoto(randomPhoto));

// Streaming photo, in case Telegram doesn't accept direct URL
bot.command("cat2", (ctx) => ctx.replyWithPhoto({ url: randomPhoto }));

// Look ma, reply middleware factory
bot.command("foo", reply("http://coub.com/view/9cjmt"));

// Wow! RegEx
bot.hears(/reverse (.+)/, (ctx) =>
  ctx.reply(ctx.match[1].split("").reverse().join(""))
);

// Launch bot
bot.launch();
