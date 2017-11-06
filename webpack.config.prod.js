const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    alias: {
      Containers: path.resolve(__dirname, 'src/containers'),
      Components: path.resolve(__dirname, 'src/components')
    }
  },
  devtool: 'cheap-module-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[chunkhash:8].js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1
              }
            },
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  'src/styles/base/_colors.scss',
                  'src/styles/utilities/_mixins.scss'
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                quality: 65,
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquaint: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new ExtractTextPlugin({
      filename: 'styles/[name]-[chunkhash:8].css',
      disable: process.env.NODE_ENV === 'development'
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true
      },
      inject: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
}
