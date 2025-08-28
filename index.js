/**
 * Main entry point for KING-LION-V4 WhatsApp Bot.
 * Modernized, maintainable, and robust version.
 * Author: ghost-king-tz
 * Date: 2025-08-28
 */

require('./settings');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pino = require('pino');
const readline = require('readline');
const NodeCache = require('node-cache');
const { Boom } = require('@hapi/boom');
const { PhoneNumber } = require('awesome-phonenumber');
const { 
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidDecode,
    jidNormalizedUser,
    delay,
    DisconnectReason,
} = require('@whiskeysockets/baileys');

const { handleMessages, handleGroupParticipantUpdate, handleStatus } = require('./main');
const { smsg } = require('./lib/myfunc');

// Read owner data safely
let owner = [];
try {
    owner = JSON.parse(fs.readFileSync('./data/owner.json'));
} catch {
    owner = [];
}

global.botname = "KNIGHT BOT";
global.themeemoji = "•";
global.phoneNumber = process.env.BOT_PHONE_NUMBER || "911234567890"; // Use env for better management

const settings = require('./settings');
const pairingCode = !!global.phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");

// Readline for CLI
const rl = process.stdin.isTTY ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;
const question = (text) => rl
    ? new Promise(resolve => rl.question(text, resolve))
    : Promise.resolve(settings.ownerNumber || global.phoneNumber);

// Store abstraction for memory
const store = {
    messages: {},
    contacts: {},
    chats: {},
    groupMetadata: async (jid) => ({}),
    bind(ev) {
        ev.on('messages.upsert', ({ messages }) => {
            for (const msg of messages) {
                if (msg.key && msg.key.remoteJid) {
                    this.messages[msg.key.remoteJid] = this.messages[msg.key.remoteJid] || {};
                    this.messages[msg.key.remoteJid][msg.key.id] = msg;
                }
            }
        });
        ev.on('contacts.update', (contacts) => {
            for (const contact of contacts) {
                if (contact.id) this.contacts[contact.id] = contact;
            }
        });
        ev.on('chats.set', (chats) => { this.chats = chats; });
    },
    loadMessage: async (jid, id) => this.messages[jid]?.[id] || null,
};

async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const msgRetryCounterCache = new NodeCache();

    const bot = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
            const jid = jidNormalizedUser(key.remoteJid);
            const msg = await store.loadMessage(jid, key.id);
            return msg?.message || "";
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });

    store.bind(bot.ev);

    // JID utility
    bot.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return decode.user && decode.server ? `${decode.user}@${decode.server}` : jid;
        }
        return jid;
    };

    // Get name utility
    bot.getName = async (jid, withoutContact = false) => {
        const id = bot.decodeJid(jid);
        let v;
        if (id.endsWith("@g.us")) {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = await bot.groupMetadata(id) || {};
            return v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
        }
        v = id === '0@s.whatsapp.net'
            ? { id, name: 'WhatsApp' }
            : id === bot.decodeJid(bot.user.id)
            ? bot.user
            : (store.contacts[id] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    };

    bot.public = true;
    bot.serializeM = (m) => smsg(bot, m, store);

    // Message event handler
    bot.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek?.message) return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
                ? mek.message.ephemeralMessage.message
                : mek.message;
            if (mek.key?.remoteJid === 'status@broadcast') {
                await handleStatus(bot, chatUpdate);
                return;
            }
            if (!bot.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
            await handleMessages(bot, chatUpdate, true);
        } catch (err) {
            console.error("Error in handleMessages:", err);
            if (chatUpdate.messages?.[0]?.key?.remoteJid) {
                await bot.sendMessage(chatUpdate.messages[0].key.remoteJid, {
                    text: '❌ An error occurred while processing your message.',
                }).catch(console.error);
            }
        }
    });

    // Contacts update event handler
    bot.ev.on('contacts.update', update => {
        for (const contact of update) {
            const id = bot.decodeJid(contact.id);
            if (store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    // Connection events
    bot.ev.on('connection.update', async (s) => {
        const { connection, lastDisconnect } = s;
        if (connection === "open") {
            console.log(chalk.yellow(`🌿 Connected as ${JSON.stringify(bot.user, null, 2)}`));
            try {
                const botNumber = bot.user.id.split(':')[0] + '@s.whatsapp.net';
                await bot.sendMessage(botNumber, {
                    text: `KING LION Bot Connected Successfully!\nTime: ${new Date().toLocaleString()}\nStatus: Online and Ready!\nMake sure to join below channel`,
                });
            } catch (e) { /* ignore self-message fails */ }
            await delay(1500);
            console.log(chalk.cyan(`< ================================================== >`));
            console.log(chalk.magenta(`\n${global.themeemoji} YT CHANNEL: *☾✩⃛⃟ 𝔅𝔯𝔬𝔨𝔢𝔫 𝔖𝔬𝔲𝔩 𝔗𝔢𝔠𝔥☽✩⃛⃟*
              `));
            console.log(chalk.magenta(`${global.themeemoji} GITHUB: kinglion`));
            console.log(chalk.magenta(`${global.themeemoji} WA NUMBER: ${owner}`));
            console.log(chalk.magenta(`${global.themeemoji} CREDIT: KING LION`));
            console.log(chalk.green(`${global.themeemoji} Bot Connected Successfully! ✅`));
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode !== 401
        ) {
            startBot();
        }
    });

    bot.ev.on('creds.update', saveCreds);

    // Group participants update
    bot.ev.on('group-participants.update', async (update) => {
        await handleGroupParticipantUpdate(bot, update);
    });

    // Additional status and reaction events
    bot.ev.on('messages.upsert', async (m) => {
        if (m.messages[0]?.key?.remoteJid === 'status@broadcast') {
            await handleStatus(bot, m);
        }
    });
    bot.ev.on('status.update', async (status) => {
        await handleStatus(bot, status);
    });
    bot.ev.on('messages.reaction', async (status) => {
        await handleStatus(bot, status);
    });

    // Pairing code handler
    if (pairingCode && !bot.authState.creds.registered) {
        if (useMobile) throw new Error('Cannot use pairing code with mobile API');

        let userNumber = global.phoneNumber || await question(
            chalk.bgBlack(chalk.greenBright(
                `Please type your WhatsApp number 😍\nFormat: 6281376552730 (without + or spaces): `
            ))
        );

        userNumber = userNumber.replace(/[^0-9]/g, '');
        if (!PhoneNumber('+' + userNumber).isValid()) {
            console.log(chalk.red('Invalid phone number. Please enter your full international number (e.g., 15551234567 for US, 447911123456 for UK, etc.) without + or spaces.'));
            process.exit(1);
        }

        setTimeout(async () => {
            try {
                let code = await bot.requestPairingCode(userNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)));
                console.log(chalk.yellow(
                    `\nPlease enter this code in your WhatsApp app:\n1. Open WhatsApp\n2. Go to Settings > Linked Devices\n3. Tap "Link a Device"\n4. Enter the code shown above`
                ));
            } catch (error) {
                console.error('Error requesting pairing code:', error);
                console.log(chalk.red('Failed to get pairing code. Please check your phone number and try again.'));
            }
        }, 2000);
    }

    return bot;
}

// Robust error and reload handling
startBot().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});

// Hot reload this file
const file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
