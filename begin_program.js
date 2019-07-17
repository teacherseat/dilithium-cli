const chalk = require('chalk')
const fs = require("fs")
const path = require("path")

function begin_program(opts){
  if (opts.name === undefined){
    console.log(`You must supply a name [computer beging program ${chalk.green('alpha1')}]`)
    return
  }
  if (fs.existsSync(path.resolve(__dirname,opts.name))) {
    console.log(`a directory called ${chalk.green(opts.name)} already exists, aborting.`)
  }
  fs.mkdirSync(path.resolve(__dirname,opts.name))
  mkfil(opts.name, undefined, 'README.md')
  mkfil(opts.name, undefined,'package.json')
  mkfil(opts.name, undefined,'webpack.config.js')
  mkdir(opts.name, 'public', {keep: true})
  mkdir(opts.name, 'src')
  mkdir(opts.name, 'src/application', {quiet: true})
  mkfil(opts.name, 'src/application', 'config.js')
  mkfil(opts.name, 'src/application', 'routes.coffee')
  mkdir(opts.name, 'src/application/views', {quiet: true})
  mkdir(opts.name, 'src/application/views/pages', {quiet: true})
  mkfil(opts.name, 'src/application/views/pages', 'home.coffee')
  mkdir(opts.name, 'src/application/components', {keep: true})
  mkdir(opts.name, 'src/application/services'  , {quiet: true})
  mkfil(opts.name, 'src/application/services'  , 'api.coffee')
  mkdir(opts.name, 'src/application/models'    , {keep: true})
  mkdir(opts.name, 'src/shared', {quiet: true})
  mkdir(opts.name, 'src/shared/layouts', {quiet: true})
  mkfil(opts.name, 'src/shared/layouts'        , 'application.coffee')
  mkdir(opts.name, 'src/shared/components'     , {keep: true})
}

function mkfil(root,dir,filename){
  let new_path = null
  const template_path = path.resolve(__dirname,'templates',filename)
  if (dir === undefined) {
    console.log(`      ${chalk.green.bold('create')}  ${filename}`)
    new_path = path.resolve(__dirname,root,filename)
  } else {
    console.log(`      ${chalk.green.bold('create')}  ${dir}/${filename}`)
    new_path = path.resolve(__dirname,root,dir,filename)
  }
  fs.createReadStream(template_path).pipe(fs.createWriteStream(new_path))
}

function mkdir(root,dir,opts={}){
  if (opts.quiet === true) {
  } else {
    console.log(`      ${chalk.green.bold('create')}  ${dir}`)
  }
  fs.mkdirSync(path.resolve(__dirname,root,dir))
  if (opts.keep === true){
    fs.openSync(path.resolve(__dirname,root,dir,'.keep'), 'w')
  }
}

module.exports = begin_program
