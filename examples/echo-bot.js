/**
 * echo-bot
 */
const Telegraf = require('telegraf')
const { Markup } = require('telegraf')

module.exports = () => {
  //создать встроенную клавиатуру с двумя кнопками,
  //метод inlineKeyboard принимает массив с объектами кнопок
  const replyOptions = Markup.inlineKeyboard([
    //создать кнопку, при нажатии на которую будет выполняться редирект на указанный url,
    //метод urlButton принимает два параметра:
    //надпись на кнопке,
    //url, на который нужно выполнить редирект
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    //создать кнопку, при нажатии на которую будет инициализироваться указанное событие,
    //метод callbackButton принимает два параметра:
    //надпись на кнопке,
    //название события, которое должно быть инициализировано
    Markup.callbackButton('Delele', 'delete')
  ]).extra()

  const bot = new Telegraf(process.env.BOT_TOKEN)

  //при получении сообщения...
  bot.on('message', (ctx) => {
    //...скопировать полученное сообщение и отправить его пользователю, добавив к нему
    //встроенную клавиатуру,
    //метод sendCopy принимает три параметра:
    //идентификатор чата,
    //объект сообщения, которое нужно скопировать,
    //объект с дополнительными параметрами (в данном случае объект с параметрами
    //клавиатуры)
    return ctx.telegram.sendCopy(ctx.from.id, ctx.message, replyOptions)
  })

  //при инициализации указанного события выполнить указанную функцию обратного вызова
  bot.action('delete', ({ deleteMessage }) => deleteMessage())

  bot.startPolling()
}
