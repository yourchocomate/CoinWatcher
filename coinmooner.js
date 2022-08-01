const fs = require("fs");
const { moonerCoins } = require("./lib/coinmooner/services.cm");
const { moonerDirectionMenu, coinMoonerMenu } = require("./lib/coinmooner/menu.cm");

module.exports = {
  getMoonerCoins: (ctx, whitelist) => {
    let skip = ctx.match.input.split('_')[1];
    whitelist ?
      moonerCoins(ctx, skip).then((res) => moonerDirectionMenu(ctx, skip))
    :
      null;
  },
  setMoonerSection: async(ctx, whitelist) => {
    let section = ctx.match.input.split('_')[1];
    if(whitelist) {
      let data = fs.readFileSync(`./data/coinmooner/user/${ctx.chat.id}.json`, { encoding: 'utf8', flag: 'r' });
      let sectionsJSON = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
      if(sectionsJSON.includes(section)) {
        let updatedData = sectionsJSON.filter(data => data != section);
        fs.writeFile(`./data/coinmooner/user/${ctx.chat.id}.json`, JSON.stringify(updatedData), err => {
          if (err) console.log("Error writing file:", err);
        });
        await ctx.reply(`${section} removed`)
      } else {
        sectionsJSON.push(section);
        fs.writeFile(`./data/coinmooner/user/${ctx.chat.id}.json`, JSON.stringify(sectionsJSON), err => {
          if (err) console.log("Error writing file:", err);
        });
        await ctx.reply(`${section} selected`)
      }
    }
  },
  resetSection: async(ctx, whitelist) => {
    if(whitelist) {
      const data = [];
      fs.writeFile(`./data/coinmooner/user/${ctx.chat.id}.json`, JSON.stringify(data), err => {
          if (err) console.log("Error writing file:", err);
        });
      await ctx.reply(`Sections Resetted!`)
    }
  },
  showFilters: async(ctx, whitelist) => {
    if(whitelist) {
      let filters = fs.readFileSync(`./data/coinmooner/user/${ctx.chat.id}.json`,{encoding:'utf8', flag:'r'});
      await ctx.reply(`Active Sections - ${filters}`);
    }
  },
  showMoonerMenu : async(ctx, whitelist) => {
    whitelist ?
      coinMoonerMenu(ctx)
    :
      await ctx.reply(`Hi, ${ctx.chat.first_name} :D, Fuccck Yoouuu ^_^`)
      &
      await ctx.replyWithSticker('CAACAgIAAxkBAAEUwzZinuSk98GFgmmOJO0XqpBuoA6qLwACzQ8AArmr6Upe0YrDKbm3ZyQE')
  },
  writeToFile : (user) => {
    fs.open(`./data/coinmooner/user/${user}.json`,'r',function(fileExists, file) {
      if (fileExists) {
        fs.writeFile(`./data/coinmooner/user/${user}.json`, JSON.stringify([]), (err) => {
          if (err) console.error(err)
          console.log('Data written')
        });
      }
    });
  }
}