const { Markup } = require("telegraf");
const fs = require("fs");

module.exports = {
  markCoin: async(ctx, whitelist) => {
    let name = ctx.match.input.split('_')[1];
    if(whitelist) {
      await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          [Markup.button.callback('✅Sent', 'nothing'), Markup.button.callback('❌', `tokenuncheck_${name}`)]
        ]
      })
      let data = fs.readFileSync('./data/all.json', { encoding: 'utf8', flag: 'r' });
      
      let tokensJSON = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
      tokensJSON.push(name);

      fs.writeFile("./data/all.json", JSON.stringify(tokensJSON), err => {
        if (err) console.log("Error writing file:", err);
      });
    }
  },
  unMarkCoin: async(ctx, whitelist) => {
    let name = ctx.match.input.split('_')[1];
    if(whitelist) {
      await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          [Markup.button.callback('mark', `mark_${name}`)]
        ]
      })
      let data = fs.readFileSync('./data/all.json', { encoding: 'utf8', flag: 'r' });
      const tokensJSON = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];

      let updatedData = tokensJSON.filter(data => data != name);

      fs.writeFile("./data/all.json", JSON.stringify(updatedData), err => {
        if (err) console.log("Error writing file:", err);
      });
    }
  }
}