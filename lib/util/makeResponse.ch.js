module.exports = (data, special) => {
let token = special ? data.token : data;
return `<b>${token.name}</b> <u>${token.listed ? '- Listed✅' : ''}</u>
<b><a href="${token.telegram}">🚀 Telegram</a> - <a href="${token.website}">🌐 Website</a> - <a href="https://coinhunters.cc/tokens/${token.url}">💎 Coinhunter</a>
Launch Date: ${new Date(token.launch_date).toDateString()}
Chain: ${token.chain}
Symbol: ${token.symbol}
</b>`;
}