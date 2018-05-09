import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import htmlTemplate from 'rollup-plugin-generate-html-template'

const development = process.env.NODE_ENV === 'development'

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
    babel(),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    commonjs(),
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html'
    })
  ]
}

if (development) {
  config.plugins.push(require('rollup-plugin-serve')('dist'))
} else {
  config.plugins.push(
    require('rollup-plugin-uglify')({ compress: { passes: 2 } })
  )
}

export default config
