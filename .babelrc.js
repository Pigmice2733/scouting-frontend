module.exports = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        loose: true,
        uglify: true,
        targets: {
          browsers: '> 1%'
        }
      }
    ],
    [require('@babel/preset-stage-1'), {}]
  ],
  plugins: [
    [
      require('@babel/plugin-transform-react-jsx'),
      {
        pragma: 'h'
      }
    ]
  ]
}
