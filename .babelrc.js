module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator'],
        modules: false,
        loose: true
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h'
      }
    ],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-typescript', { jsxPragma: 'h' }]
  ]
}
