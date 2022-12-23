import { User } from '../models/user.model.js';
import { bot } from '../core/bot.js';
import { Composer, Markup } from 'telegraf';
import { menu_elon_Rus, menu_elon_Uzb } from '../libs/menu_elon.js';

const composer = new Composer();
composer.hears("📣 E'lon berish", async (ctx) => {
  const user_id = ctx.from.id;
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Botga "/start" tugmasi orqali qayta kiring`);
    } else {
      if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
        await ctx.reply(`Iltimos, <b>"Telefon raqami yuborish"</b> tugmasini bosing 👇🏽`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('📱 Telefon raqami yuborish'), '🏠 Bosh sahifa']])
            .oneTime()
            .resize(),
        });
      } else {
        menu_elon_Uzb(ctx);
      }
    }
  });
});
composer.hears('📣 Подать обявления', async (ctx) => {
  const user_id = ctx.from.id;
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Повторно войти в бот через "/start"`);
    } else {
      if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
        await ctx.reply(`Нажмите кнопку <b>Отправить номер телефона</b> 👇`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('📱 Отправить номер телефона'), '🏠 Главная страница']])
            .oneTime()
            .resize(),
        });
      } else {
        menu_elon_Rus(ctx);
      }
    }
  });
});

bot.use(composer.middleware());
