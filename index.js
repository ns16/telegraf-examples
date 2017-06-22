/**
 * API
 */
//const Telegraf = require('telegraf') //подключает Telegraf

//const app = new Telegraf(token, options) //инициализирует новое Telegraf приложение

//console.log(app.token) //получить/установить токен
//console.log(app.webhookReply) //получить/установить флаг, указывающий использовать протокол вебхуки

//app.use(middleware) //регистрирует посредника

//app.on(updateTypes, middleware, [middleware...]) //регистрирует посредника для обработки обновлений указанного типа

//app.hears(triggers, middleware, [middleware...]) //регистрирует посредника для обработки конкретных текстовых фраз

//app.command(commands, middleware, [middleware...]) //обрабатывает команду

//app.action(triggers, middleware, [middleware...]) //регистрирует посредника для обработки события

//app.gameQuery(middleware, [middleware...]) //регистрирует посредника для обработки действий с игровыми запросами

//app.startPolling(timeout, limit, allowedUpdates) //начинает обновление опроса

//app.startWebhook(webhookPath, tlsOptions, port, [host]) //начинает слушать @ https://host:port/webhookPath для Telegram вызовов

//app.stop() //останавливает вебхук и опрос

//app.webhookCallback(webhookPath) //возвращает функцию обратного вызова, подходящую для метода http.createServer(), чтобы обрабатывать запросы. Вы можете также использовать эту функцию обратного вызова, чтобы монтировать ваше Telegraf приложение в Koa/Connect/Express приложение

//app.handleUpdate(rawUpdate, [webhookResponse]) //обрабатывает сырое Telegram обновление

//ctx.answerCallbackQuery('text') //всплывающая подсказка
//ctx.answerCallbackQuery('text', undefined, true) //модальное окно с кнопкой ОК

/**********************************************************************************/


/**
 * 1st example
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// //ответ на команду start
// app.command('start', ({ from, reply }) => {
//   console.log('start', from)
//   return reply('Welcome!')
// })
//
// app.hears('hi', (ctx) => ctx.reply('Hey there!')) //ответ на точное текстовое
// сообщение
//
// app.on('sticker', (ctx) => ctx.reply('👍')) //ответ на стикер
//
// app.startPolling()


/**
 * 2nd example
 */
// const Telegraf = require('telegraf')
// const { reply } = Telegraf
//
// const bot = new Telegraf(process.env.BOT_TOKEN)
//
// bot.command('/oldschool', (ctx) => ctx.reply('Hello'))
// bot.command('/modern', ({ reply }) => reply('Yo'))
// bot.command('/hipster', reply('λ'))
//
// bot.startPolling()


/**
 * 3rd example Middleware
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// //этот посредник предшествует всем запросам
// app.use((ctx, next) => {
//   const start = new Date()
//   return next().then(() => {
//     const ms = new Date() - start
//     console.log('Response time %sms', ms)
//   })
// })
//
// //этот посредник отвечает только на текст
// app.on('text', (ctx) => ctx.reply('Hello World'))
//
// app.startPolling()


/**
 * 4th example, Context инкапсулирует telegram обновление
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// //этот посредник отвечает только на стикеры
// app.on('sticker', (ctx) => {
//   console.log(ctx.message.sticker)
//   return ctx.reply('Hey there!')
// })
//
// app.startPolling()


/**
 * 5th example, State - ctx.state - объект для обмена данными между посредниками
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// //Auth middleware
// app.use((ctx, next) => {
//   ctx.state.role = getUserRole(ctx.message)
//   return next()
// })
//
// function getUserRole(message) { return 'admin' }
//
// //этот посредник отвечает только на текст
// app.on('text', (ctx) => {
//   return ctx.reply(`Hello ${ctx.state.role}`)
// })
//
// app.startPolling()


/**
 * 6th example, Session - ctx.session - объект для передачи данных между запросами
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// //посредник для использования сессий
// app.use(Telegraf.memorySession())
//
// app.on('text', (ctx) => {
//   ctx.session.counter = ctx.session.counter || 0
//   ctx.session.counter++
//   return ctx.reply(`Message counter:${ctx.session.counter}`)
// })
//
// app.startPolling()


/**
 * 7th example, Update types.
 *
 * Supported update types: message, edited_message, callback_query, inline_query,
 * shipping_query, pre_checkout_query, chosen_inline_result, channel_post,
 * edited_channel_post.
 *
 * Available update sub-types: text, audio, document, photo, sticker, video, voice,
 * contact, location, venue, new_chat_members, left_chat_member, new_chat_title,
 * new_chat_photo, delete_chat_photo, group_chat_created, migrate_to_chat_id,
 * supergroup_chat_created, channel_chat_created, migrate_from_chat_id, pinned_message,
 * game, video_note, invoice, successful_payment.
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// // Handle message update
// app.on('message', (ctx) =>  {
//   return ctx.reply('Hey there!')
// })
//
// // Handle sticker or photo update
// app.on(['sticker', 'photo'], (ctx) =>  {
//   console.log(ctx.message)
//   return ctx.reply('Cool!')
// })
//
// app.startPolling()


/**
 * 8th example, Webhooks (слишком сложно!!!)
 */
// const Telegraf = require('telegraf')
// const fs = require('fs')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// // TLS options
// const tlsOptions = {
//   key:  fs.readFileSync('server-key.pem'),
//   cert: fs.readFileSync('server-cert.pem'),
//   ca: [
//     // This is necessary only if the client uses the self-signed certificate.
//     fs.readFileSync('client-cert.pem')
//   ]
// }
//
// // Set telegram webhook
// app.telegram.setWebhook('https://server.tld:8443/secret-path', {
//   content: 'server-cert.pem'
// })
//
// // Start https webhook
// app.startWebhook('/secret-path', tlsOptions, 8443)
//
//
// // Http webhook, for nginx/heroku users.
// app.startWebhook('/secret-path', null, 5000)
//
//
// // Use webhookCallback() if you want to attach telegraf to existing http server
// require('http')
//   .createServer(app.webhookCallback('/secret-path'))
//   .listen(3000)
//
// require('https')
//   .createServer(tlsOptions, app.webhookCallback('/secret-path'))
//   .listen(8443)
//
// // Connect/Express.js integration
// const express = require('express')
// const expressApp = express()
//
// expressApp.use(app.webhookCallback('/secret-path'))
//
// expressApp.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//
// expressApp.listen(3000, () => {
//   console.log('Example app listening on port 3000!')
// })


/**
 * 9th example, How to extend context
 */
// const Telegraf = require('telegraf')
//
// const app = new Telegraf(process.env.BOT_TOKEN)
//
// app.context.db = {
//   getScores: () => { return 42 }
// }
//
// app.on('text', (ctx) => {
//   const scores = ctx.db.getScores(ctx.message.from.first_name)
//   return ctx.reply(`${ctx.message.from.first_name}: ${scores}`)
// })
//
// app.startPolling()


/**
 * 10th example, Shortcuts (слишком сложно!!!)
 */
// const Telegraf = require('telegraf')
//
// const bot = new Telegraf(process.env.BOT_TOKEN)
//
// bot.on('text', (ctx) => {
//   // Simple usage
//   ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
//
//   // Using shortcut
//   ctx.reply(`Hello ${ctx.state.role}`)
// })
//
// bot.on('/quit', (ctx) => {
//   // Simple usage
//   ctx.telegram.leaveChat(ctx.message.chat.id)
//
//   // Using shortcut
//   ctx.leaveChat()
// })
//
// bot.on('callback_query', (ctx) => {
//   // Simple usage
//   ctx.telegram.answerCallbackQuery(ctx.callbackQuery.id)
//
//   // Using shortcut
//   ctx.answerCallbackQuery()
// })
//
// bot.on('inline_query', (ctx) => {
//   const result = []
//   // Simple usage
//   ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
//
//   // Using shortcut
//   ctx.answerInlineQuery(result)
// })
//
// bot.startPolling()


/**
 * 11th example, Command handling in group
 */
// const Telegraf = require('telegraf')
//
// // Provide with options
// const app = new Telegraf(process.env.BOT_TOKEN, {username: 'eventsa_bot'})
//
// app.telegram.getMe().then((botInfo) => {
//   app.options.username = botInfo.username
// })
//
// app.command('start', (ctx) => ctx.reply('Hello World'))
//
// app.startPolling()

/**********************************************************************************/


require('./examples/custom-router-bot')()
