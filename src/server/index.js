
require('babel-core/register')({
  ignore: /postcssparser\.js$|node_modules/
})


module.exports = require('./server.js')