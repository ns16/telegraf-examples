/**
 * custom-router-bot
 */
const Telegraf = require('telegraf')
const { Router, Extra, memorySession } = require('telegraf')

module.exports = () => {
  //создать встроенную клавиатуру с семью кнопками, расположенными в три столбца
  const defaultMarkup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Add 1', 'add:1'),
      m.callbackButton('Add 10', 'add:10'),
      m.callbackButton('Add 100', 'add:100'),
      m.callbackButton('Subtract 1', 'sub:1'),
      m.callbackButton('Subtract 10', 'sub:10'),
      m.callbackButton('Subtract 100', 'sub:100'),
      m.callbackButton('Clear', 'clear')
    ], {columns: 3}))

  //создать объект класса Router
  //ctx.callbackQuery.data может содержать следующие значения: add:1, add:10, add:100,
  //sub:1, sub:10, clear
  const simpleRouter = new Router((ctx) => {
    console.log(ctx.callbackQuery)
    if (!ctx.callbackQuery.data) {
      return Promise.resolve()
    }
    const parts = ctx.callbackQuery.data.split(':')
    return Promise.resolve({
      route: parts[0],
      state: {
        amount: parseInt(parts[1], 10) || 0
      }
    })
  })

  const bot = new Telegraf(process.env.BOT_TOKEN)

  //зарегистрировать посредника для сессий
  bot.use(memorySession())

  //по нажатии на кнопку встроенной клавиатуры
  //вызвать метод middleware класса Router
  bot.on('callback_query', simpleRouter.middleware())

  //при получении команды start
  //сохранить значение переменной сессии value равным 0,
  //отправить сообщение со значением value,
  //отобразить встроенную клавиатуру
  bot.command('start', (ctx) => {
    ctx.session.value = 0
    return ctx.reply(`Value: <b>${ctx.session.value}</b>`, defaultMarkup)
  })

  //при получении команды add
  //к значению переменной сессии value прибавить значение переменной состояния amount,
  //отредактировать текст сообщения
  simpleRouter.on('add', (ctx) => {
    ctx.session.value = (ctx.session.value || 0) + ctx.state.amount
    return editText(ctx)
  })

  //при получении команды sub
  //из значения переменной сессии value вычесть значение переменной состояния amount,
  //отредактировать текст сообщения
  simpleRouter.on('sub', (ctx) => {
    ctx.session.value = (ctx.session.value || 0) - ctx.state.amount
    return editText(ctx)
  })

  //при получении команды clear
  //обнулить значение переменной сессии value,
  //отредактировать текст сообщения
  simpleRouter.on('clear', (ctx) => {
    ctx.session.value = 0
    return editText(ctx)
  })

  bot.startPolling()

  function editText (ctx) {
    return ctx.session.value !== 42
      //если значение переменной сессии value не равно 42, то
      //отредактировать текст сообщения, заменив в нем значение переменной сессии value
      //и добавив к нему встроенную клавиатуру
      ? ctx.editMessageText(`Value: <b>${ctx.session.value}</b>`, defaultMarkup).catch(() => undefined)
      //если значение переменной сессии value равно 42, то
      //вывести модальное окно со смайликом, а затем после нажатия кнопки ОК
      //отредактировать текст сообщения, заменив его смайликом и удалив из него
      //встроенную клавиатуру
      : ctx.answerCallbackQuery('🎉', undefined, true).then(() => ctx.editMessageText(`🎉 ${ctx.session.value} 🎉`))
  }
}
