import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy-assets'

const babelConfig = require('./.babelrc')

const development = process.env.NODE_ENV === 'development'

const jsPlugins = [
  resolve({
    extensions: ['.js', '.ts', '.tsx', '.mjs']
  }),
  commonjs(),
  babel({
    babelrc: false,
    ...babelConfig
  })
]

if (!development) {
  jsPlugins.push(require('rollup-plugin-uglify')({ compress: { passes: 2 } }))
}

const swConfig = {
  input: './src/sw.ts',
  output: {
    file: 'dist/sw.js',
    format: 'iife'
  },
  plugins: jsPlugins
}

const config = {
  input: './src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      extract: true,
      modules: {
        generateScopedName: development
          ? '[local]-[hash:base64:3]'
          : '[hash:base64:3]'
      }
    }),
    copy({
      assets: [
        './src/index.html',
        './src/assets',
        './src/_redirects',
        './src/_headers',
        './src/browserconfig.xml',
        './src/manifest.json'
      ]
    }),
    ...jsPlugins
  ]
}

if (development) {
  config.plugins.push(
    require('rollup-plugin-serve')({
      historyApiFallback: true,
      contentBase: 'dist'
    })
  )
}

export default [config, swConfig]
