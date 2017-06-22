/**
 * example-bot
 */
const Telegraf = require('telegraf')
const { Extra, memorySession, reply } = require('telegraf')

module.exports = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN)

  //зарегистрировать посредника для сессий
  bot.use(memorySession())

  //зарегистрировать посредника для логгирования
  bot.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log('response time %sms', ms)
    })
  })

  //удалить все короткие текстовые сообщения
  bot.filter(({ message }) => !message || message.text.length > 2)

  const sayYoMiddleware = ({ reply }, next) => reply('yo').then(next)

  //при получении текстового сообщения
  //в 4х из 5ти случаев вернуть фрагмент карты с меткой
  //метод replyWithLocation принимает два параметра: долгота и широта
  bot.on('text', ({ replyWithLocation }, next) => {
    if (Math.random() > 0.2) {
      return next()
    }
    return Promise.all([
      replyWithLocation((Math.random() * 180) - 90, (Math.random() * 180) - 90),
      next()
    ])
  })

  //при получении сообщения 'Hey'
  //отправить сообщение 'Yo',
  //инкрементировать счетчик и отправить сообщение с его значением
  bot.hears('Hey', sayYoMiddleware, (ctx) => {
    ctx.session.heyCounter = ctx.session.heyCounter || 0
    ctx.session.heyCounter++
    return ctx.replyWithMarkdown(`_Hey counter:_ ${ctx.session.heyCounter}`)
  })

  //при получении команды answer
  //отправить сообщение 'Yo',
  //вывести в консоль объект сообщения,
  //отправить сообщение '*42*' (полужирное 42)
  bot.command('answer', sayYoMiddleware, (ctx) => {
    console.log(ctx.message)
    return ctx.reply('*42*', Extra.markdown())
  })

  const catPhoto = 'http://lorempixel.com/400/200/cats/'

  //при получении команды cat
  //отправить случайное фотографию кота
  //метод replyWithPhoto принимает один параметр: путь к фотографии или url фотографии
  bot.command('cat', ({ replyWithPhoto }) => replyWithPhoto(catPhoto))

  //сделать тоже самое
  bot.command('cat2', ({ replyWithPhoto }) => replyWithPhoto({ url: catPhoto }))

  //при получении команды foo
  //отправить сообщение с указанной ссылкой
  bot.command('foo', reply('http://coub.com/view/9cjmt'))

  //при получении сообщения, начинающегося с 'reverse '
  //отправить сообщение, в котором фрагмент после 'reverse ' указан в обратном порядке
  bot.hears(/reverse (.+)/, ({ match, reply }) => {
    return reply(match[1].split('').reverse().join(''))
  })

  bot.startPolling()
}
