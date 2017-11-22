module.exports = {
  extends: require('eslint-config-synacor'),
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'react/jsx-indent-props': ['error', 2],
    'lines-around-comment': 'off'
  }
}
