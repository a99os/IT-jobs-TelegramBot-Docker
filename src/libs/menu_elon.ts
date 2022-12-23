import { Context, Markup } from 'telegraf';

export async function menu_elon_Uzb(ctx: Context) {
  await ctx.reply(`<b>Yangi e'lon qo'shish</b> tugmasini bosing 👇🏽`, {
    parse_mode: 'HTML',
    ...Markup.keyboard([
      ["🆕 Yangi e'lon qo'shish"],
      ['☸️ Tilni tanlash', "men bergan e'lonlar"],
      ['🏠 Bosh sahifash ', "💁🏻‍♂️E'lon berish tartibi"],
    ])
      .oneTime()
      .resize(),
  });
}
export async function menu_elon_Rus(ctx: Context) {
  await ctx.reply('<b>Добавить новое объявление</b> 👇', {
    parse_mode: 'HTML',
    ...Markup.keyboard([
      ['🆕 Добавить новое объявление'],
      ['☸️ Выбор языка', 'Мои объявления'],
      ['🏠 Главная страница', '💁 Рекламная процедура'],
    ])
      .oneTime()
      .resize(),
  });
}
