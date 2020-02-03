'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/perfect-scrollbar/dist/perfect-scrollbar.js');
    app.import('node_modules/perfect-scrollbar/css/perfect-scrollbar.css');
  }
};
