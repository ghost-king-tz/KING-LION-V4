const moment = require('moment-timezone');
const fetch = require('node-fetch');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/smash-bot/loft-xmd');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    const caption = `
*乂  𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝 乂*

✩  *Name*: ${json.name}
✩  *Watchers*: ${json.watchers_count}
✩  *Size*: ${(json.size / 1024).toFixed(2)} MB
✩  *Last Updated*: ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}
✩  *URL*: ${json.html_url}
✩  *Forks*: ${json.forks_count}
✩  *Stars*: ${json.stargazers_count}

「Powered by 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD」
`.trim();

    await sock.sendMessage(chatId, {
      video: { url: 'https://files.catbox.moe/gkchfw.mp4' },
      caption: caption
    }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: 'FOR SALE.' }, { quoted: message });
  }
}

module.exports = githubCommand;
