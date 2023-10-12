/*By Mas`Rens
support scan / pairing
*/
process.on('uncaughtException', console.error) //Safe Log Error 
require('./settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('../lib/myfunc')
let { menu } = require('./menu')
const moment = require('moment-timezone')

global.db.data = JSON.parse(fs.readFileSync('./database.json'))
if (global.db.data) global.db.data = {
	users: {},
    group: {},
    chats: {},
    ...(global.db.data || {})
}

module.exports = client = async (client, m, chatUpdate, store) => {
       try {
        require('./schema')(client, m, chatUpdate, store)
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(budy) ? budy.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '/\'
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const fatkuns = (m.quoted || m)
        const from = m.key.remoteJid
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
    	const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
        let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
        
         if (global.db.data.chats[m.chat].antilink) {
         if (budy.match(`chat.whatsapp.com`)) {
         if (!isBotAdmins) return m.reply(`Ehh Bot Gak Admin T_T`)
         let gclink = (`https://chat.whatsapp.com/` + await client.groupInviteCode(m.chat))
         let isLinkThisGc = new RegExp(gclink, 'i')
         let isgclink = isLinkThisGc.test(m.text)
         if (isgclink) return 
         if (isAdmins) return 
         if (isCreator) return 
         client.sendMessage(m.chat, {delete: {remoteJid: m.chat, id: m.id, participant: m.sender}})
         client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
         sleep(300)
          }
          }
          
        if (m.message) {
       client.readMessages([m.key])
       console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
        
       global.loading = async function (){
var comott = [
`${mess.wait}`,
`successful use of the feature ${prefix + command}`,
]
let { key } = await client.sendMessage(m.chat, {text: "█▓▓▓▓▓▓▓▓▓▓▓▓▓ 10%"})
//Pengalih isu
for (let i = 0; i < comott.length; i++) {
await client.sendMessage(m.chat, {text: comott[i], edit: key });
//PESAN LEPAS
}} 
if (isCmd && autoAI) {
    switch (command) {
       case'qc': 
                if (!q) return m.reply('Masukan Text')
                const { quote } = require('../lib/quote.js')
                let ppnyauser = await await client.profilePictureUrl(m.sender, 'image').catch(_=> 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
                const rest = await quote(q, pushname, ppnyauser)
                m.reply(mess.wait)
                client.sendImageAsSticker(m.chat, rest.result, m, { packname: global.packname, author: global.author})
                break
       case 'sticker':
       case 's': {
               if (!quoted) {
               return m.reply(`Balas Video/Gambar dengan caption ${prefix + command}`)
               }
               m.reply(mess.wait);   
               if (/image/.test(mime)) {
               let media = await quoted.download();
               let encmedia = await client.sendImageAsSticker(m.chat, media, m, {packname: global.packname, author: global.author });
               await fs.unlinkSync(encmedia);
               } else if (/video/.test(mime)) {
               if ((quoted.msg || quoted).seconds > 11) {
               return m.reply('Maksimal 10 detik!');
                }
                let media = await quoted.download();
                let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {packname: global.packname, author: global.author});
                await fs.unlinkSync(encmedia);
                } else {
                return m.repy(`Kirim Gambar/Video dengan caption ${prefix + command}\nDurasi Video 1-9 Detik`)
                }
                }
                break;
      case 'tiktok':
      case 'tiktoknowm':
      case 'tiktokmusic':       
                try {
                if (!args || !args[0]) return m.reply(`${prefix + command} https://vm.tiktok.com/ZSR7c5G6y/`)
                if (!args[0].match('tiktok.com')) return m.reply(mess.invalid)
                let a = await require(process.cwd() + '/lib/tiktok')(args[0])
                if (!a.status) return m.reply(jsonFormat(a))
                m.reply(mess.wait)
                let caption = `乂  *T I K T O K*\n\n`
                caption += `	◦  *Author* : ${a.autor.nickname}\n`
                caption += `	◦  *Username* : ${a.autor.username}\n`
                caption += `	◦  *Likes* : ${(a.details.like_count)}\n`
                caption += `	◦  *Shares* : ${(a.details.share_count)}\n`
                caption += `	◦  *Comments* : ${(a.details.comment_count)}\n`
                caption += `	◦  *Caption* : ${a.details.desc || '-'}\n\n`
                caption += global.footer
                if (command == 'tiktok' || command == 'tt') return client.sendFile(m.chat, a.download.video.with_wm.url, 'video.mp4', caption, m)
                if (command == 'tiktoknowm') return client.sendFile(m.chat, a.download.video.no_wm.url, 'video.mp4', caption, m)
                if (command == 'tikmp3' || command == 'tiktokmusic') return !a.download.audio.url ? client.reply(m.chat, mess.fail, m) : client.sendFile(m.chat, a.download.audio.url, 'audio.mp3', '', m)
                } catch (e) {
                console.log(e)
                return m.reply(mess.error)
                }
                break
    default:
    }
    }
    } catch (err) {
        console.log("Eror Di Bagian ichan.js "+util.format(err))
    //  m.reply(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.cyanBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})