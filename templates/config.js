const path = require('path')

module.exports  = {
  target: 'web',
  entry: {
    'application.js' : path.resolve(__dirname, 'src/application/routes.coffee')
  },
  output: {
    path    : path.resolve(__dirname, '..', '..' 'public'),
    filename: '[name]'
  },
  resolve: {
    extensions: ['.coffee','.js','.json'],
    modules: ['node_modules/'],
    alias: {
      components : path.resolve(__dirname, 'src/components/'),
      views      : path.resolve(__dirname, 'src/views/'),
      models     : path.resolve(__dirname, 'src/models/'),
      layouts    : path.resolve(__dirname, '../src/shared/layouts'),
    }
  },
  node: { __dirname: false },
  module : { rules: [{
    test: /\.coffee$/, loader: 'coffee-loader'
  }] }
}