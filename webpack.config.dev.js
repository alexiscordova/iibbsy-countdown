const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.export = {
  resolve: {
    alias: {
      Containers: path.resolve(__dirname, 'src/containers'),
      Components: path.resolve(__dirname, 'src/components')
    }
  },
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          'file-loader?name=[path][name].[ext]'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin()
  ]
}
