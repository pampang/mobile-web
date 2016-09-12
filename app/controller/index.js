'use strict'

const fs = require('fs');
const path = require('path');

exports.ecshop = function* () {
  this.redirect('http://a.shefenqi.com/mobile/');
}

// 首页
exports.index = function* () {
  this.set('Content-Type', 'text/html');
  this.body = fs.readFileSync(path.resolve(__dirname, '../public/index.html'));
}
