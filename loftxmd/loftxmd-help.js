const settings = require('../settings');
const fs = require('fs');
const path = require('path');

const menuData = [
  {
    title: "🛡️ GENERAL COMMAND",
    image: 'https://yourdomain.com/general.jpg',
    audio: 'https://yourdomain.com/general.mp3',
    commands: [
      '.help or.menu', '.ping', '.alive', '.tts <text>', '.owner', '.joke', '.quote', '.fact', '.weather <city>',
      '.news', '.attp <text>', '.lyrics <song_title>', '.8ball <question>', '.groupinfo', '.staff or.admins',
      '.vv', '.trt <text> <lang>', '.ss <link>', '.jid'
    ]
  },
  {
    title: "⚙️ ADMIN COMMANDS",
    image: 'https://yourdomain.com/admin.jpg',
    audio: 'https://yourdomain.com/admin.mp3',
    commands: [
      '.ban @user', '.promote @user', '.demote @user', '.mute <minutes>', '.unmute', '.delete or.del', '.kick @user',
      '.warnings @user', '.warn @user', '.antilink', '.antibadword', '.clear', '.tag <message>', '.tagall',
      '.chatbot', '.resetlink', '.welcome <on/off>', '.goodbye <on/off>'
    ]
  },
  //... ongeza section nyingine hapa kwa muundo huu
];

async function helpCommand(sock, chatId, message) {
    const menuHeader = `\u200F
> ─────────────  
>    KING 👑 LION 🦁  
> ─────────────`;

    // Tuma "menu header"
    await sock.sendMessage(chatId, {
        text: menuHeader,
        contextInfo: { forwardingScore: 1, isForwarded: true }
    }, { quoted: message });

    // Loop sections, tuma section moja moja (kila moja na picha & audio yake)
    for (const section of menuData) {
        let caption = `\u200F
> ${section.title}  
${section.commands.map(c=>`> 🩸 ${c}`).join('\n')}
`;

        // Tuma picha na caption ya section
        await sock.sendMessage(chatId, {
            image: { url: section.image },
            caption: caption,
            contextInfo: { forwardingScore: 1, isForwarded: true }
        }, { quoted: message });

        // Tuma audio ya section (optional)
        if(section.audio){
            await sock.sendMessage(chatId, {
                audio: { url: section.audio },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: message });
        }
    }

module.exports = helpCommand;