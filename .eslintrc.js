module.exports = {
  extends: [
    'plugin:caleb/recommended',
    'plugin:caleb/jest',
    'plugin:caleb/preact'
  ],
  rules: {
    'no-negated-condition': 'off',
    'no-process-exit': 'off',
    'no-alert': 'off',
    'handle-callback-err': 'off',
    'caleb/react/jsx-no-bind': 'off',
    'caleb/jsx-a11y/media-has-caption': 'off'
  }
}
