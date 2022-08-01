const { Markup } = require("telegraf");

module.exports = {
    mainMenu: (ctx) => {
        return ctx.reply("Select a platform to start with -",{
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('💎 Coin Hunter 💎', 'huntermenu')],
            [Markup.button.callback('🌝 Coin Mooner 🌝', 'moonermenu')]
          ])
        })
    }
}