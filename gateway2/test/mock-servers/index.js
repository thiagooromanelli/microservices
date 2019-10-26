const fs = require('fs')
const files = fs.readdirSync(__dirname)
const debug = require('debug')('courier:gateway:test')

files.forEach(file => {
  if (file !== 'index.js') {
    debug(`Loading server ${file}`)
    require(`./${file}`)
  }
})