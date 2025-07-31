const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
> ─────────────  
> KING 👑 LION 🦁
> ─────────────  
> —𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀—  
>   
> 🛡️ GENERAL COMMAND 🛡️  
> 🩸 .help or .menu  
> 🩸 .ping  
> 🩸 .alive  
> 🩸 .tts <text>  
> 🩸 .owner  
> 🩸 .joke  
> 🩸 .quote  
> 🩸 .fact  
> 🩸 .weather <city>  
> 🩸 .news  
> 🩸 .attp <text>  
> 🩸 .lyrics <song_title>  
> 🩸 .8ball <question>  
> 🩸 .groupinfo  
> 🩸 .staff or .admins  
> 🩸 .vv  
> 🩸 .trt <text> <lang>  
> 🩸 .ss <link>  
> 🩸 .jid  
>   
> ⚙️ ADMIN COMMANDS ⚙️  
> 🩸 .ban @user  
> 🩸 .promote @user  
> 🩸 .demote @user  
> 🩸 .mute <minutes>  
> 🩸 .unmute  
> 🩸 .delete or .del  
> 🩸 .kick @user  
> 🩸 .warnings @user  
> 🩸 .warn @user  
> 🩸 .antilink  
> 🩸 .antibadword  
> 🩸 .clear  
> 🩸 .tag <message>  
> 🩸 .tagall  
> 🩸 .chatbot  
> 🩸 .resetlink  
> 🩸 .welcome <on/off>  
> 🩸 .goodbye <on/off>  
>   
> 👑 OWNER COMMANDS 👑  
> 🩸 .mode  
> 🩸 .autostatus  
> 🩸 .clearsession  
> 🩸 .antidelete  
> 🩸 .cleartmp  
> 🩸 .setpp <reply to image>  
> 🩸 .autoreact  
>   
> 🎨 IMAGE/STICKER COMMANDS 🎨  
> 🩸 .blur <image>  
> 🩸 .simage <reply to sticker>  
> 🩸 .sticker <reply to image>  
> 🩸 .tgsticker <Link>  
> 🩸 .meme  
> 🩸 .take <packname>  
> 🩸 .emojimix <emj1>+<emj2>  
>   
> 🎮⚡ GAME COMMAND ⚡🎮  
> 🩸 .tictactoe @user  
> 🩸 .hangman  
> 🩸 .guess <letter>  
> 🩸 .trivia  
> 🩸 .answer <answer>  
> 🩸 .truth  
> 🩸 .dare  
>   
> 🤖✨ AI COMMAND ✨🤖  
> 🩸 .gpt <question>  
> 🩸 .gemini <question>  
> 🩸 .imagine <prompt>  
> 🩸 .flux <prompt>  
>   
> 😂🎉 Fun command 🎉😂  
> 🩸 .compliment @user  
> 🩸 .insult @user  
> 🩸 .flirt  
> 🩸 .shayari  
> 🩸 .goodnight  
> 🩸 .roseday  
> 🩸 .character @user  
> 🩸 .wasted @user  
> 🩸 .ship @user  
> 🩸 .simp @user  
> 🩸 .stupid @user [text]  
>   
> 🔤 Text Maker:  
> 🩸 .metallic <text>  
> 🩸 .ice <text>  
> 🩸 .snow <text>  
> 🩸 .impressive <text>  
> 🩸 .matrix <text>  
> 🩸 .light <text>  
> 🩸 .neon <text>  
> 🩸 .devil <text>  
> 🩸 .purple <text>  
> 🩸 .thunder <text>  
> 🩸 .leaves <text>  
> 🩸 .1917 <text>  
> 🩸 .arena <text>  
> 🩸 .hacker <text>  
> 🩸 .sand <text>  
> 🩸 .blackpink <text>  
> 🩸 .glitch <text>  
> 🩸 .fire <text>  
>   
> ⏬⚡ Download commands ⚡⏬  
> 🩸 .play <song_name>  
> 🩸 .song <song_name>  
> 🩸 .instagram <link>  
> 🩸 .facebook <link>  
> 🩸 .tiktok <link>  
> 🩸 .video <song name>  
> 🩸 .ytmp4 <Link>  
>   
> 🔗📂 GitHub Menu 📂🔗  
> 🩸 .git  
> 🩸 .github  
> 🩸 .sc  
> 🩸 .script  
> 🩸 .repo  
......................
  try {
        // Send Catbox image with caption
        await sock.sendMessage(chatId, {
            image: { url:'https://files.catbox.moe/9xr1nl.jpg' },
            caption: helpMessage,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363161513685998@newsletter',
                    newsletterName: 'KING LION',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

        // Send Catbox audio
        await sock.sendMessage(chatId, {
            audio: { url: 'https://files.catbox.moe/lgb600.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;

