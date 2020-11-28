const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, 'dev.env') })

const coffee = {
  test: /\.coffee$/, loader: 'coffee-loader'
}

const minicss = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, 'stylesheets')
          ]
        } // sassOptions
      } // options
    }
  ]
}

const file = {
  test: /\.(svg|png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
      name: '/[path][name].[ext]',
  },
}

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: {
    'stylesheets/application' : path.resolve(__dirname, 'src/stylesheets/application.sass'),
    'application.js'          : path.resolve(__dirname, 'src/javascripts/routes.coffee')
  },
  output: {
    path    : path.resolve(__dirname, 'public'),
    filename: '[name]'
  },
  resolve: {
    extensions: ['.coffee','.js','.json', 'scss'],
    modules: ['node_modules/'],
    alias: {
      components : path.resolve(__dirname, 'src/javascripts/components/'),
      layouts    : path.resolve(__dirname, 'src/javascripts/layouts/'),
      models     : path.resolve(__dirname, 'src/javascripts/models/'),
      views      : path.resolve(__dirname, 'src/javascripts/views/'),
      services   : path.resolve(__dirname, 'src/javascripts/services/'),
      lib        : path.resolve(__dirname, 'src/javascripts/lib/')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ file: '[name].css'}),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: [
            path.resolve(__dirname, '/public/stylesheets/application'),
          ]
        }
      }
    })
  ],
  node: { __dirname: false },
  module: { rules: [coffee, minicss, file] }
}
