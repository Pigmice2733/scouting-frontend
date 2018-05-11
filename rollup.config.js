import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy-assets'

const development = process.env.NODE_ENV === 'development'

const jsPlugins = [
  babel(),
  resolve({
    extensions: ['.js', '.ts', '.tsx']
  }),
  commonjs()
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
      assets: ['./src/index.html']
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

export default [swConfig, config]
