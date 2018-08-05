module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator'],
        modules: false,
        loose: true
      }
    ],
    ['@babel/preset-typescript', { jsxPragma: 'h', isJSX: true }]
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h'
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
}
