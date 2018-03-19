const vars = require('postcss-css-variables')

module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-media-minmax': {},
    'postcss-nesting': {},
    'postcss-color-gray': {},
    'postcss-css-variables': {},
    'postcss-color-function': {},
    'rucksack-css': {},
    autoprefixer: {}
  }
}
