module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
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
    // use the + operator to join strings instead of string.concat()
    ['@babel/plugin-transform-template-literals', { loose: true }],
    ['module:calebeby-babel-plugin-transform-typescript', { jsxPragma: 'h' }]
  ]
}
