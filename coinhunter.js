const lib = require("./lib/coinhunter/services.ch");
const { hunterDirectionMenu, coinHunterMenu } = require("./lib/coinhunter/menu.ch");

module.exports = {
  getCoinsCoinHunter: (ctx, whitelist) => {
    let page = ctx.match.input.split('_')[1];
    let action = ctx.match.input.split('_')[0];
    whitelist ?
      lib[action](ctx, page).then((res) => hunterDirectionMenu(ctx, action, page))
    :
      null;
  },
  showHunterMenu: async(ctx, whitelist) => {
    whitelist ?
      coinHunterMenu(ctx)
    :
      await ctx.reply(`Hi, ${ctx.chat.first_name} :D, Fuccck Yoouuu ^_^`)
      &
      await ctx.replyWithSticker('CAACAgIAAxkBAAEUwzZinuSk98GFgmmOJO0XqpBuoA6qLwACzQ8AArmr6Upe0YrDKbm3ZyQE')
  }
}