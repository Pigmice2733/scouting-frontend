module.exports = require('babel-jest').createTransformer({
  // need to tranform es6 import into require() for jest to run it
  // this extends ./.babelrc.js
  plugins: ['@babel/transform-modules-commonjs']
})
