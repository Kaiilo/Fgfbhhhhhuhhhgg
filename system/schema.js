const chalk = require('chalk')
const fs = require('fs')

module.exports = client = async (client, m, chatUpdate, store) => {
try {
	   const botNumber = await client.decodeJid(client.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
	    const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
        let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
        let isNumber = x => typeof x === 'number' && !isNaN(x)
        let user = global.db.data.users[m.sender]
        if (typeof user !== 'object') global.db.data.users[m.sender] = {}
        if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!isNumber(user.limit)) user.limit = limitUser
        } else global.db.data.users[m.sender] = {
        afkTime: -1,
        afkReason: '',
        limit: limitUser,
        }
        let chats = global.db.data.chats[m.chat]
        if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
        if (chats) {
        if (!('mute' in chats)) chats.mute = false
        if (!('antilink' in chats)) chats.antilink = false
        } else global.db.data.chats[m.chat] = {
        mute: false,
        antilink: false,
        }
        } catch (err) {
        console.error(err)
        }
        }
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})