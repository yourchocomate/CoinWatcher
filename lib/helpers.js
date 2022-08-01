const fs = require("fs");
const dotenv = require("dotenv");
const { mainMenu } = require("./menu.global");
dotenv.config();

module.exports = {
  startMessage: async(ctx, whitelist) => {
    !whitelist ?
      await ctx.reply(`Hi, ${ctx.chat.first_name} :D, Fuccck Yoouuu ^_^`)
      &
      await ctx.replyWithSticker(process.env.INTRUDER_REPLY_STICKER)
    :
      await ctx.reply(`
  Good Day, ${ctx.chat.first_name} :D`)
      &
      mainMenu(ctx);
  },
  showMainMenu: async(ctx, whitelist) => {
    whitelist ?
      mainMenu(ctx)
    :
      await ctx.reply(`Hi, ${ctx.chat.first_name} :D, Fuccck Yoouuu ^_^`)
      &
      await ctx.replyWithSticker(process.env.INTRUDER_REPLY_STICKER)
  },
  jsonReader: (filePath, cb) => {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
  },
}