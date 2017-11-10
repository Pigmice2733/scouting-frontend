const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const indexHtml = path.join(__dirname, 'src', 'index.html')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
  const production = env.NODE_ENV === 'production'
  const config = {
    devtool: production ? false : 'inline-source-map',
    entry: ['./index.js', indexHtml],
    context: path.resolve(__dirname, 'src'),
    resolve: {
      extensions: ['.js', '.sss']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.sss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]-[hash:base64:4]',
                  camelCase: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: indexHtml,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'link:href'],
                minimize: true,
                collapseWhitespace: true,
                conservativeCollapse: false,
                interpolate: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new CopyWebpackPlugin([{ from: path.join(__dirname, '_redirects') }])
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'scripts.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept'
      },
      host: '0.0.0.0'
    }
  }
  if (production) {
    config.plugins.push(new UglifyJSPlugin())
  }
  return config
}
