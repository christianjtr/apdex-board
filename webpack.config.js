const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'devlopment',
  devtool: 'inline-source-map',
  entry: [
    './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
    './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
    './src/index.ts'
  ],
  module: {
    rules: [{
      test: /\.css$/i,
      use: [{
        loader: MiniCSSExtractPlugin.loader,
        options: {
          esModule: true
        }
      },
      'css-loader'
      ]
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/data',
        to: 'data'
      }]
    })
  ]
}
