const settings = require('../settings');

const videos = [
   'https://files.catbox.moe/yqzo6g.mp4',
   'https://files.catbox.moe/q2ozun.mp4',
   'https://files.catbox.moe/gkchfw.mp4'
];
const audios = [
    'https://files.catbox.moe/1ilyhr.mp3',
    'https://files.catbox.moe/mi1e6p',
    'https://files.catbox.moe/1keby3'
];

async function helpCommand(sock, chatId, message, args = []) {
    const helpMessage = `

 ⠛⠛⣿⣿⣿⣿⣿⡷⢶⣦⣶⣶⣤⣤⣤⣀   
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀ 
    ⠉⠉⠉⠙⠻⣿⣿⠿⠿⠛⠛⠛⠻⣿⣿⣇ 
   ⢤⣀⣀⣀  ⢸⣷⡄ ⣁⣀⣤⣴⣿⣿⣿⣆
     ⠹⠏   ⣿⣧ ⠹⣿⣿⣿⣿⣿⡿⣿
          ⠛⠿⠇⢀⣼⣿⣿⠛⢯⡿⡟
           ⠦⠴⢿⢿⣿⡿⠷ ⣿ 
        ⠙⣷⣶⣶⣤⣤⣤⣤⣤⣶⣦⠃ 
        ⢐⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿  
        ⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇  
          ⠙⠻⢿⣿⣿⣿⣿⠟⠁

K I N G -- L I O N -- V4 
  

—𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀—  

> 🛡️ GENERAL COMMAND 🛡️  
> 📋.help or.menu  
> 🏓.ping  
> 💡.alive  
> 🔊.tts <text>  
> 👤.owner  
> 😂.joke  
> 💬.quote  
> 📚.fact  
> 🌦️.weather <city>  
> 📰.news  
> 🎨.attp <text>  
> 🎶.lyrics <song_title>  
> 🎱.8ball <question>  
> 👥.groupinfo  
> 🧑‍💼.staff or.admins  
> 🔎.vv  
> 🌐.trt <text> <lang>  
> 📸.ss <link>  
> 🆔.jid  

> ⚙️ ADMIN COMMANDS ⚙️  
> 🚫.ban @user  
> ⬆️.promote @user  
> ⬇️.demote @user  
> 🔕.mute <minutes>  
> 🔔.unmute  
> 🗑️.delete or.del  
> 👢.kick @user  
> ⚠️.warnings @user  
> ❗.warn @user  
> 🔗.antilink  
> 🚫.antibadword  
> ♻️.clear  
> 🏷️.tag <message>  
> 📢.tagall  
> 🤖.chatbot  
> 🔄.resetlink  
> 👋.welcome <on/off>  
> 👋.goodbye <on/off>  

> 👑 OWNER COMMANDS 👑  
> 🔀.mode  
> 📶.autostatus  
> 🧹.clearsession  
> 🛡️.antidelete  
> 🧹.cleartmp  
> 🖼️.setpp <reply to image>  
> 😆.autoreact  

> 🎨 IMAGE/STICKER COMMANDS 🎨  
> 🌫️.blur <image>  
> 🖼️.simage <reply to sticker>  
> 🖼️.sticker <reply to image>  
> 🔗.tgsticker <Link>  
> 😂.meme  
> 📦.take <packname>  
> 🌀.emojimix <emj1>+<emj2>  

> 🎮⚡ GAME COMMAND ⚡🎮  
> ⭕.tictactoe @user  
> 🔤.hangman  
> 🔡.guess <letter>  
> ❓.trivia  
> ✅.answer <answer>  
> 🗣️.truth  
> 🎲.dare  

> 🤖✨ AI COMMAND ✨🤖  
> 💬.gpt <question>  
> 💡.gemini <question>  
> 🖌️.imagine <prompt>  
> 🌈.flux <prompt>  

> 😂🎉 FUN COMMAND 🎉😂  
> 🌟.compliment @user  
> 😜.insult @user  
> 😍.flirt  
> 📝.shayari  
> 🌙.goodnight  
> 🌹.roseday  
> 🧑‍🎤.character @user  
> 😵.wasted @user  
> 💞.ship @user  
> 😏.simp @user  
> 🤪.stupid @user [text]  

> 🔤 TEXT MAKER  
> 🪙.metallic <text>  
> ❄️.ice <text>  
> ☃️.snow <text>  
> ✨.impressive <text>  
> 🟩.matrix <text>  
> 💡.light <text>  
> 🌟.neon <text>  
> 😈.devil <text>  
> 💜.purple <text>  
> ⚡.thunder <text>  
> 🍃.leaves <text>  
> 🎬.1917 <text>  
> 🏟️.arena <text>  
> 👨‍💻.hacker <text>  
> 🏖️.sand <text>  
> 🎀.blackpink <text>  
> 🌀.glitch <text>  
> 🔥.fire <text>  

> ⏬⚡ DOWNLOAD COMMANDS ⚡⏬  
> ▶️.play <song_name>  
> 🎵.song <song_name>  
> 📸.instagram <link>  
> 📘.facebook <link>  
> 🎥.tiktok <link>  
> 🎬.video <song name>  
> 📥.ytmp4 <Link>  

> 🔗📂 GITHUB MENU 📂🔗  
> 🐙.git  
> 💻.github  
> 📜.sc  
> 📄.script  
> 📁.repo  

> █▄▄█ █▄█ █▄█ █▄█

 █▄█ █▄█`;

    // Chagua random video na audio kila mara.help ikitumwa
    const videoUrl = videos[Math.floor(Math.random() * videos.length)];
    const audioUrl = audios[Math.floor(Math.random() * audios.length)];

    try {
        // Tuma random video na menu nzima kwenye caption
        await sock.sendMessage(chatId, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: helpMessage
        }, { quoted: message });

        // Tuma random audio
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
