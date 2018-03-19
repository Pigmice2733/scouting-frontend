const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = {
  content: [__dirname],
  add: (app, middleware, options) => {
    app.use(convert(history({})))
  }
}
