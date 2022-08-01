const { Markup } = require("telegraf");

module.exports = {
    coinHunterMenu: (ctx) => {
        return ctx.reply("Coin Hunter Menu",{
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('👑 Promoted Coins 👑', 'getPromotedTokens_0'),Markup.button.callback('📡 All Coins 📡', 'getAllTokens_0')],
            [Markup.button.callback('💎 Presale 💎', 'getPresaleTokens_0'),Markup.button.callback('🛡️ Audited Coins 🛡️', 'getAuditedTokens_0')],
            [Markup.button.callback('📈 Top Today 📈', 'getTodaysTopTokens_0'),Markup.button.callback('💡 New Coins 💡', 'getNewlyListedTokens_0')],
            [Markup.button.callback('↪️ Back To Main Menu', 'mainmenu')]
          ])
        })
    },
    hunterDirectionMenu: (ctx, action, page) => {
        return ctx.replyWithHTML('Hunter Direction',{
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🔄 Load More', `${action}_${page+1}`)],
            [Markup.button.callback('↪️ Back To Menu', 'huntermenu')]
          ])
                         })
    },
}