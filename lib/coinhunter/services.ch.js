const fs = require("fs");
const axios = require("axios").default;
const { Markup } = require("telegraf");
const dotenv = require("dotenv");
const makeResponse = require("../util/makeResponse.ch");
dotenv.config();

module.exports = {
    getNewlyListedTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/token/list/newlyListed/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      tokensJSON.includes(token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.name}`)]
                        ])
                      );
                    })
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
    getTodaysTopTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/token/list/todayUpVotes/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                      tokensJSON.includes(token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.name}`)]
                        ])
                      );
                    })
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
    getPresaleTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/token/list/prelaunch/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                      tokensJSON.includes(token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.name}`)]
                        ])
                      );
                    });
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
    getAuditedTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/token/list/audit/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                      tokensJSON.includes(token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.name}`)]
                        ])
                      );
                    })
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
    getAllTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/token/list/allVotes/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                      tokensJSON.includes(token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.name}`)]
                        ])
                      );
                    })
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
    getPromotedTokens: (ctx, page, filters='') => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.CH_API_URL}/promotion/${page}${filters}`)
            .then(function (response) {
                if(response.data.success.data.length > 0) {
                    response.data.success.data.forEach(async token => {
                      let marked = false;
                      let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
                      tokensJSON.includes(token.token.name) ? marked = true : marked = false;
                      await ctx.replyWithHTML(makeResponse(token, true),
                        Markup.inlineKeyboard([
                          !marked ? [Markup.button.callback('mark', `mark_${token.token.name}`)] : [Markup.button.callback('✅ Sent','nothing'), Markup.button.callback('❌',`tokenuncheck_${token.token.name}`)]
                        ])
                      );
                    })
                } else {
                    ctx.reply("No tokens left for you master :D")
                }
                setTimeout(()=> {
                    resolve();
                }, 4000)
            })
            .catch(function (error) {
                console.log(error.msg);
                ctx.reply("Try Again");
            })  
        });
    },
}