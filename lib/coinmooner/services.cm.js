
const fs = require("fs");
const axios = require("axios").default;
const {Markup} = require("telegraf");
const makeResponse = require("../util/makeResponse.cm");
const dotenv = require("dotenv");
dotenv.config();

const getCoinById = async(coinId) => {
    let response = [];
    const data = JSON.stringify({
            query: `query getCoinById($id: String!) {    
              coin(id: $id) {      
                  id      
                  name      
                  symbol         
                  launchDate     
                  contractAddress      
                  decimals      
                  chain      
                  website      
                  audit      
                  telegram     
                  isVerified
                  }   
              }`,
            variables: { "id":coinId }
          });
          
          const config = {
            method: 'post',
            url: process.env.CM_API_URL,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          try {
            response = await axios(config);
          } catch (err) {
            //
          }
    return response.data.data.coin;
  };

module.exports = {
  moonerCoins: (ctx, skip = 0) => {
    return new Promise(async(resolve, reject) => {
      let activeSections = fs.readFileSync('./data/coinmooner/activeSection.json',{encoding:'utf8', flag:'r'});
      const data = JSON.stringify({
        query: `query GetCoins($activeSection: SectionInput!, $pagination: PaginationInput, $order: OrderInput) {
        coins(section: $activeSection, pagination: $pagination, order: $order) {
          id
          name
          chain
          symbol
          launchDate
          totalUpvotes
          upvotesToday
          isUpvoted
          logo
          createdOn
          isCaptchaEnabled
          isLogoDownloaded
          useManualPrice
          currentMarketCap
          oneHourComparison
          oneDayComparison
          version
          isVerified
          isHoneypot
          isScanned
          audit
          __typename
        }
      }`,
        variables: {
          "activeSection": {
            "section":JSON.parse(activeSections)
          },
          "pagination":
          {
            "skip":Number(skip),
            "take":10
          },
          "order" : {
            "field" : "launchDate",
            "direction" : -1
          }
        }
      });
      
      const config = {
        method: 'post',
        url: process.env.CM_API_URL,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then(function (response) {

        if(response.data.data.coins.length > 0) {
            let tokensJSON = fs.readFileSync('./data/all.json',{encoding:'utf8', flag:'r'});
            response.data.data.coins.forEach(async token => {
              let marked = false;
              let response = [];
              try {
                response = await getCoinById(token.id);
              } catch(err) {
                console.log(err.message)
              }

              tokensJSON.includes(token.name) ? marked = true : marked = false;
            await ctx.replyWithHTML(makeResponse(response),
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
        console.log(error);
        ctx.reply("Try Again");
      });
    });
  }
  
}
