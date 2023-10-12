const fs = require('fs')
const chalk = require('chalk')
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

global.owner = ['6281352787682']
global.numberBot = '6281352787682' 
global.premium = ['6281352787682']
global.namaBot = '?'
global.author = '?'
global.packname = '?'
global.owner_name = '?''
global.footer = '?'
global.sessionName = 'ichan'
global.state = true //Ganti false Jika Ingin via Scan
global.autoAI = false
/* apikey https://api.neoxr.eu/ */
global.Api = new (require('./neoxrApi'))(global.API_KEY)
global.API_KEY = 'rensnight' 

global.email = '?'
global.namaweb = '?'
global.myweb = '?'
global.region = 'Indonesia'
//—————「 Set Limit 」—————//
//terserah mau ubah atau nggak
global.limitawal = {
    premium: "Infinity",
    free: 10,
}

global.mess = {
wait : 'Processed . . .',
error : 'Sorry this feature is in error',
invalid: 'URL is Invalid!',
fail: 'Can\'t get metadata!',
group: 'This command will only work in groups.',
admin: 'This command only for group admin.',
botAdmin: 'This command will work when I become an admin.'
}

global.loc = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})