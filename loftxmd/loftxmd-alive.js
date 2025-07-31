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

✨ Anime Vibes Activated ✨
> 領域展開 — 隈水

Sasa bot yupo live na energy mpya!  
═══════════════
Type *.menu* kuona commands zote.
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