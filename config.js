var nitrogen = require('nitrogen')
  , Store = require('nitrogen-file-store');

var config = {
//    host: 'localhost',
//    http_port: 3030,
//    protocol: 'http'
};

config.store = new Store(config);

config.log_levels = ['info', 'warn', 'error'];

module.exports = config;
