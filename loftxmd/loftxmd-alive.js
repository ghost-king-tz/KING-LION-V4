const settings = require("../settings");
async function aliveCommand(sock, chatId, message) {
    try {
        // Tuma video yenye caption ya alive
        await sock.sendMessage(chatId, {
            video: { url: 'https://files.catbox.moe/bt5gb6.mp4' }, // au tumia link ya attachment
            caption: `
═══════════════
KING LION 🦁: STATUS  [ ONLINE ]*
Version: ${settings.version}

✨ The power of Artificial intelligence 🧠✨
> 領域展開 — 隈水

KING LION V4 Engine Is Alive now 👨‍💻
═══════════════
Type *.menu* To see all command 💣.
`
        }, { quoted: message });

        // Tuma audio/nyimbo kama PTT (voice note)
        await sock.sendMessage(chatId, {
            audio: { url: 'https://files.catbox.moe/g6y8qe.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'KING LION bot iko hewani!' }, { quoted: message });
    }
}

module.exports = aliveCommand;
