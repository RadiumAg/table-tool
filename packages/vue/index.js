'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/table-tool-vue.cjs.prod.js');
} else {
  module.exports = require('./dist/table-tool-vue.cjs.js');
}
