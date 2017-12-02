const browserSync = require('browser-sync').create()
const webpack = require('webpack')
const singlePageMiddleware = require('connect-history-api-fallback')

const env = { NODE_ENV: process.env.NODE_ENV || 'development' }

const webpackConfig = require('./webpack.config')(env)
const compiler = webpack(webpackConfig)

compiler.plugin('done', stats => {
  if (stats.hasErrors() || stats.hasWarnings()) {
    console.error(stats.toString())
  }
})

compiler.watch({}, (err, stats) => {})

browserSync.init({
  server: 'build',
  middleware: [singlePageMiddleware()],
  reloadOnRestart: true,
  logPrefix: 'BS',
  files: 'build/*',
  cors: true
})
