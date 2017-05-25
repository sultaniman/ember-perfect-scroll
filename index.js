/* eslint-env node */
'use strict';

var path = require('path');


module.exports = {
  name: 'ember-perfect-scroll',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/perfect-scrollbar/js/perfect-scrollbar.js');
      app.import(app.bowerDirectory + '/perfect-scrollbar/css/perfect-scrollbar.css');
    }
  }
};
