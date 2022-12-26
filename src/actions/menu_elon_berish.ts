import { User } from '../models/user.model.js';
import { bot } from '../core/bot.js';
import { Composer, Markup } from 'telegraf';
import { inlineMenuElonBerish, inlineMenuElonBerishRus, menu_elon_Rus, menu_elon_Uzb } from '../libs/menu_elon.js';
import { getLang } from '../libs/lang.js';
import { keyboards } from '../libs/keyboards.js';

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

composer.hears("🆕 Yangi e'lon qo'shish", async (ctx) => {
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' });
    }
  });
  menu_elon_Uzb(ctx);
  await inlineMenuElonBerish(ctx, `<b>Yangi e'lon qo'shish uchun quyidagilaran birini tanlang:</b>`);
});
composer.hears('🆕 Добавить новое объявление', async (ctx) => {
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' });
    }
  });
  menu_elon_Rus(ctx);
  await inlineMenuElonBerishRus(ctx, `<b>Выберите нужный раздель чтобы добавить новую обьявлению:</b>`);
});

composer.action('andoza', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id));
  if (lang === 'UZB')
    await ctx.editMessageText('<b>Kerakli andoza tanlang:</b>', {
      parse_mode: 'HTML',
      ...keyboards['inline_andoza'],
    });
  else
    await ctx.editMessageText('<b>Выберите нужный шаблон:</b>', {
      parse_mode: 'HTML',
      ...keyboards['inline_andoza_rus'],
    });
});

bot.use(composer.middleware());
