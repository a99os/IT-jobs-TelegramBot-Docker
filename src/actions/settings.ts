import { Composer } from 'telegraf';
import { bot } from '../core/bot.js';

import { savelang, selectLang } from '../libs/lang.js';

const composer = new Composer();

composer.hears('Tilni tanlash', async (ctx) => {
  await selectLang(ctx);
});
composer.hears('Выбор языка', async (ctx) => {
  await selectLang(ctx);
});
composer.hears("🇺🇿 O'zbek tili", async (ctx) => {
  await savelang(ctx, 'UZB');
});
composer.hears('🇷🇺 Русский язык', async (ctx) => {
  await savelang(ctx, 'RUS');
});

bot.use(composer.middleware());
