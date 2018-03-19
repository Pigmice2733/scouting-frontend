const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const mode = process.env.NODE_ENV
const devtool = mode === 'development' ? 'source-map' : false

const root = __dirname

const tsLoader = {
  test: /\.tsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions']
              },
              exclude: ['transform-regenerator']
            }
          ]
        ],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              pragma: 'h'
            }
          ],
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-typescript'
        ]
      }
    },
    'ts-loader'
  ],
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
      }),
      new CopyWebpackPlugin([
        { from: path.join(root, '_redirects') },
        { from: path.join(root, '_headers') },
        { from: path.join(root, 'manifest.json') },
        {
          from: path.join(root, 'src', 'assets', 'favicon.ico'),
          to: 'favicon.ico'
        },
        { from: path.join(root, 'src', 'assets'), to: 'assets' }
      ])
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
