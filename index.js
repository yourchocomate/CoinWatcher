const dotenv = require("dotenv");
const { Telegraf } = require("telegraf");
const { getCoinsCoinHunter, showHunterMenu } = require("./coinhunter");
const { getMoonerCoins, setMoonerSection, resetSection, showFilters, showMoonerMenu, writeToFile } = require("./coinmooner");
const { markCoin, unMarkCoin } = require("./lib/actions.global");
const { startMessage, showMainMenu } = require("./lib/helpers");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

let whitelist = JSON.parse(process.env.WHITELIST);

bot.start((ctx) => {
  startMessage(ctx, whitelist.includes(ctx.chat.username));
});

bot.action('mainmenu', (ctx) => {
  showMainMenu(ctx, whitelist.includes(ctx.chat.username));
});

/** Start Coin Hunter Actions **/

  bot.action('huntermenu', (ctx) => {
    showHunterMenu(ctx, whitelist.includes(ctx.chat.username));
  });

  bot.action(/get+/, (ctx) => {
    getCoinsCoinHunter(ctx, whitelist.includes(ctx.chat.username));
  });

/** End Coin Hunter Actions **/

/** Start Coin Mooner Actions **/

  bot.action('moonermenu', (ctx) => {
    showMoonerMenu(ctx, whitelist.includes(ctx.chat.username));
    writeToFile(ctx.chat.id);
  });
  bot.action(/loadMoonerCoins_+/, (ctx) => {
    getMoonerCoins(ctx, whitelist.includes(ctx.chat.username));
  });
  bot.action(/setMoonerSection_+/, (ctx) => {
    setMoonerSection(ctx, whitelist.includes(ctx.chat.username));
  });
  bot.action('reset_coinmoon', (ctx) => {
    resetSection(ctx, whitelist.includes(ctx.chat.username));
  });
  bot.command('/filters', (ctx) => {
    showFilters(ctx, whitelist.includes(ctx.chat.username));
  });

/** End Coin Mooner Actions **/

bot.action(/mark_+/, (ctx) => {
  markCoin(ctx, whitelist.includes(ctx.chat.username));
});

bot.action(/tokenuncheck_+/, async (ctx) => {
  unMarkCoin(ctx, whitelist.includes(ctx.chat.username));
});

bot.on('callback_query', (ctx) => {
  ctx.answerCbQuery();
});


bot.on('inline_query', (ctx) => {
  const result = [];
  ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));