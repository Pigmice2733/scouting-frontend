import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy-assets'
import { terser } from 'rollup-plugin-terser'

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

const sourcemap = development

if (!development) {
  jsPlugins.push(
    terser({
      compress: {
        passes: 2,
        unsafe_comps: true,
        unsafe_math: true
      }
    })
  )
}

const swConfig = {
  input: './src/sw.ts',
  output: {
    file: 'dist/sw.js',
    format: 'iife',
    sourcemap
  },
  plugins: jsPlugins
}

const config = {
  input: './src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
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
