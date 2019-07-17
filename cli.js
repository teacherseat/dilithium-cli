#!/usr/bin/env node

const command = require('command-line-args')
const begin_program = require('./begin_program.js')

// -----------------------------------------
// Main Command
const def = [
  { name: 'command', defaultOption: true }
]
const opts = command(def, { stopAtFirstUnknown: true })
const argv = opts._unknown || []
//console.log(opts)
// -----------------------------------------
// Begin Command
if (opts.command === 'begin') {
  const def_begin = [
    { name: 'command' , type: String },
  ]
  const opts_begin = command(def_begin, { stopAtFirstUnknown: true  })
  const argv_begin = opts_begin._unknown || []
  if (argv_begin[1] === 'program') {
    begin_program({
      dir: process.cwd(),
      name: argv_begin[2]
    })
  }
}
