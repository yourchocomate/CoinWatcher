const { Markup } = require("telegraf");

module.exports = {
    coinMoonerMenu: (ctx) => {
        return ctx.reply(`Coin Mooner Menu
Command: /filters (View selected filters)
Filters :
`,{
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('👑 Promoted Coins', 'setMoonerSection_promoted'),Markup.button.callback('🏆 All Time Best', 'setMoonerSection_allTime')],
            [Markup.button.callback('💎 Presale', 'setMoonerSection_presale'),Markup.button.callback('🛡️ Audited Coins', 'setMoonerSection_audited')],
            [Markup.button.callback('📈 Top Today', 'setMoonerSection_today'),Markup.button.callback('💡 New Coins', 'setMoonerSection_new')],
            [Markup.button.callback('🔳 Reset', 'reset_coinmoon'),Markup.button.callback('🔍 Search', 'loadMoonerCoins_0')],
            [Markup.button.callback('↪️ Back To Main Menu', 'mainmenu')]
          ])
        })
    },
    moonerDirectionMenu: (ctx, skip) => {
      return ctx.replyWithHTML('Mooner Direction',{
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🔄 Load More', `loadMoonerCoins_${Number(skip)+20}`)],
          [Markup.button.callback('↪️ Back To Menu', 'moonermenu')]
        ])
      })
    }
}