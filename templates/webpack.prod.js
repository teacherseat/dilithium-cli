const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, 'prod.env') })

const coffee = {
  test: /\.coffee$/, loader: 'coffee-loader'
}

const minicss = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
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

const minifier = new TerserPlugin({
  terserOptions: {
    mangle: true,
    toplevel: true,
    keep_fnames: false,
    keep_classnames: false
  }
})

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'stylesheets/application' : path.resolve(__dirname, 'src/stylesheets/application.sass'),
    'application.min'         : path.resolve(__dirname, 'src/javascripts/routes.coffee')
  },
  output: {
    path    : path.resolve(__dirname, '..', 'public'),
    filename: '[name].[hash].js'
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
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: [
            path.resolve(__dirname, '/public/stylesheets/application'),
            path.resolve(__dirname, '/public/stylesheets/*.js')
          ]
        }
      }
    })  
  ],
  optimization: {
    minimizer: [minifier],
  },
  node: { __dirname: false },
  module: { rules: [coffee, minicss, file] }
}
