module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>10%']
        },
        exclude: ['transform-regenerator'],
        modules: false
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
