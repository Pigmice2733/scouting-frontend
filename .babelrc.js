module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
        },
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
    ['module:calebeby-babel-plugin-transform-typescript', { jsxPragma: 'h' }]
  ]
}
