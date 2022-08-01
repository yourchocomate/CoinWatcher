module.exports = (token) => {
return `<b>${token.name}</b>
<b><a href="${token.telegram}">🚀 Telegram</a> - <a href="${token.website}">🌐 Website</a> - <a href="https://coinmooner.com/coin/${token.id}">🌝 Coinmooner</a>
Launch Date: ${new Date(token.launchDate).toDateString() }
Chain: ${token.chain}
Symbol: ${token.symbol}
${token.audit != '' ? 'Audited' : 'Not Audited'}: <a href="${token.audit}">Link</a>
</b>`;
}