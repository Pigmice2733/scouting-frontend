const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const mode = process.env.NODE_ENV
const devtool = mode === 'development' ? 'source-map' : false

const tsLoader = {
  test: /\.tsx?$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-typescript', '@babel/preset-env'],
      plugins: [
        [
          require('@babel/plugin-transform-react-jsx'),
          {
            pragma: 'h'
          }
        ],
        '@babel/plugin-proposal-class-properties'
      ]
    }
  },
  exclude: /node_modules/
}

module.exports = [
  {
    module: {
      rules: [
        tsLoader,
        {
          test: /\.sss$/,
          use: [
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                localIdentName: '[local]_[hash:base64:4]'
              }
            },
            {
              loader: 'postcss-loader',
              options: { config: { path: 'postcss.config.js' } }
            }
          ]
        }
      ]
    },
    output: {
      publicPath: '/'
    },
    devServer: {
      contentBase: './dist'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.sss', '.js']
    },
    mode,
    devtool,
    entry: './src/index.tsx',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Pigmice Scouting',
        minify: { collapseWhitespace: true },
        template: 'src/index.html',
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: true
      })
    ]
  },
  {
    module: {
      rules: [tsLoader]
    },
    mode,
    devtool,
    entry: './src/sw.ts',
    target: 'webworker',
    output: {
      filename: 'sw.js',
      path: __dirname + '/dist'
    }
  }
]
