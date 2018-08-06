import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy-assets'
import { terser } from 'rollup-plugin-terser'
import * as path from 'path'
import serve from 'rollup-plugin-serve'

const babelConfig = require('./.babelrc.js')

const development = process.env.NODE_ENV === 'development'

const createBabelConfig = (modules = false) => {
  const babelConfigModule = JSON.parse(JSON.stringify(babelConfig))
  babelConfigModule.presets[0][1].targets = { esmodules: modules }
  return babelConfigModule
}

const plugins = {
  resolve: resolve({ extensions: ['.js', '.ts', '.tsx', '.mjs', '.sss'] }),
  babel: babel({ babelrc: false, ...createBabelConfig(false) }),
  babelModule: babel({ babelrc: false, ...createBabelConfig(true) }),
  terser: terser({
    module: true,
    compress: {
      passes: 2,
      unsafe_comps: true,
      unsafe_math: true
    }
  }),
  postcss: postcss({
    extract: 'dist/index.css',
    minimize: true,
    modules: {
      generateScopedName: development
        ? '[local]-[hash:base64:4]'
        : '[hash:base64:4]'
    }
  }),
  copy: copy({
    assets: [
      './src/index.html',
      './src/assets',
      './src/_redirects',
      './src/_headers',
      './src/browserconfig.xml',
      './src/manifest.json'
    ]
  })
}

const createConfig = ({
  input,
  outFormats = ['iife'],
  plugins: appendPlugins = []
}) => {
  const p = [plugins.resolve, ...appendPlugins]
  if (!development) {
    p.push(plugins.terser)
  }

  return outFormats.map(format => {
    return {
      input: format === 'es' ? [input] : input,
      plugins: p.concat(format === 'es' ? plugins.babelModule : plugins.babel),
      experimentalCodeSplitting: true,
      output: {
        ...(format !== 'es'
          ? {
              file: path.join(
                'dist',
                path.basename(input).replace(/\.[^/.]+$/, '') + '.nomodule.js'
              )
            }
          : { dir: 'dist' }),
        format,
        sourcemap: development
      }
    }
  })
}

const swConfig = createConfig({
  input: './src/sw.ts',
  plugins: [plugins.copy]
})

const config = createConfig({
  input: './src/index.tsx',
  outFormats: ['iife', 'es'],
  plugins: [plugins.postcss]
})

if (development) {
  config[0].plugins.push(
    serve({ historyApiFallback: true, contentBase: 'dist' })
  )
}

export default [...config, ...swConfig]
