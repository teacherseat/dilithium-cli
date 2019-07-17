const chalk = require('chalk')
const fs = require("fs")
const path = require("path")

function begin_program(opts){
  if (opts.name === undefined){
    console.log(`You must supply a name [computer beging program ${chalk.green('alpha1')}]`)
    return
  }
  if (fs.existsSync(path.resolve(opts.dir,opts.name))) {
    console.log(`a directory called ${chalk.green(opts.name)} already exists, aborting.`)
  }
  fs.mkdirSync(path.resolve(opts.dir,opts.name))
  const root = `${opts.dir}/${opts.name}`
  mkfil(root, undefined, 'README.md')
  mkfil(root, undefined,'package.json')
  mkfil(root, undefined,'webpack.config.js')
  mkfil(root, undefined,'dev-server.js')
  mkdir(root, 'public', {keep: true})
  mkfil(root, 'public', 'index.html')
  mkdir(root, 'src')
  mkdir(root, 'src/application', {quiet: true})
  mkfil(root, 'src/application', 'config.js')
  mkfil(root, 'src/application', 'routes.coffee')
  mkdir(root, 'src/application/views', {quiet: true})
  mkdir(root, 'src/application/views/pages', {quiet: true})
  mkfil(root, 'src/application/views/pages', 'home.coffee')
  mkdir(root, 'src/application/components', {keep: true})
  mkdir(root, 'src/application/services'  , {quiet: true})
  mkfil(root, 'src/application/services'  , 'api.coffee')
  mkdir(root, 'src/application/models'    , {keep: true})
  mkdir(root, 'src/shared', {quiet: true})
  mkdir(root, 'src/shared/layouts', {quiet: true})
  mkfil(root, 'src/shared/layouts'  , 'application.coffee')
  mkdir(root, 'src/shared/components' , {keep: true})
}

function mkfil(root,dir,filename){
  let new_path = null
  const template_path = path.resolve(__dirname,'templates',filename)
  if (dir === undefined) {
    console.log(`      ${chalk.green.bold('create')}  ${filename}`)
    new_path = path.resolve(root,filename)
  } else {
    console.log(`      ${chalk.green.bold('create')}  ${dir}/${filename}`)
    new_path = path.resolve(root,dir,filename)
  }
  fs.createReadStream(template_path).pipe(fs.createWriteStream(new_path))
}

function mkdir(root,dir,opts={}){
  if (opts.quiet === true) {
  } else {
    console.log(`      ${chalk.green.bold('create')}  ${dir}`)
  }
  fs.mkdirSync(path.resolve(root,dir))
  if (opts.keep === true){
    fs.openSync(path.resolve(root,dir,'.keep'), 'w')
  }
}

module.exports = begin_program
