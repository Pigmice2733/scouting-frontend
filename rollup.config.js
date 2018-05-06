import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import htmlTemplate from 'rollup-plugin-generate-html-template'

export default {
  input: "./src/index.tsx",
  output: {
    file: 'dist/index.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      extract: true,
      modules: true
    }),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    // uglify(),
    serve('dist'),
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html',
    }),
  ]
}
