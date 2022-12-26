import { bot } from '../core/bot.js';
import { Composer, Context } from 'telegraf';
import { getLang } from '../libs/lang.js';
import { Ads } from '../models/ads.model.js';
const composer = new Composer();

async function add_elon(ctx: Context, selectedCategory: string, lang: string) {
  const userId = String(ctx?.from?.id);
  await Ads.create({
    user_id: userId,
    category: selectedCategory,
    elon_state: 'name',
    //elon_state: "select_category",
  }).then(async (elon) => {
    if (!elon) {
      if (lang === 'UZB') await ctx.replyWithHTML("Xatolik, e'lon kiritishni qaytadan boshlang.");
      else if (lang === 'RUS') {
        await ctx.replyWithHTML('-> /Start ');
      }
    } else {
      if (lang === 'UZB') {
        let txt = 'Familiya va ismingizni kiriting:';
        if (selectedCategory === 'hodim') txt = 'Firma yoki tashkilot nomini kiriting:';
        else if (selectedCategory === 'uquvchi') txt = "O'quv markazi nomini kiriting:";

        await ctx.reply(txt);
      } else if (lang === 'RUS') {
        let txt = 'Введите свою фамилию и имя:';
        if (selectedCategory === 'hodim') txt = 'Введите название компании или организации:';
        else if (selectedCategory === 'uquvchi') txt = 'Введите название учебного центра:';

        await ctx.reply(txt);
      }
    }
  });
}

composer.action('ish', async (ctx) => {
  add_elon(ctx, 'ish', await getLang(String(ctx?.from?.id)));
});

composer.action('hodim', async (ctx) => {
  add_elon(ctx, 'hodim', await getLang(String(ctx?.from?.id)));
});
composer.action('ustoz', async (ctx) => {
  add_elon(ctx, 'ustoz', await getLang(String(ctx?.from?.id)));
});
composer.action('shogird', async (ctx) => {
  add_elon(ctx, 'shogird', await getLang(String(ctx?.from?.id)));
});
composer.action('sherik', async (ctx) => {
  add_elon(ctx, 'sherik', await getLang(String(ctx?.from?.id)));
});
composer.action('uquv_markazi', async (ctx) => {
  add_elon(ctx, 'uquv_markazi', await getLang(String(ctx?.from?.id)));
});
composer.action('uquvchi', async (ctx) => {
  add_elon(ctx, 'uquvchi', await getLang(String(ctx?.from?.id)));
});
composer.action('loyiha', async (ctx) => {
  add_elon(ctx, 'loyiha', await getLang(String(ctx?.from?.id)));
});

bot.use(composer.middleware());
