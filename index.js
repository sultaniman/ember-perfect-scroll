/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-perfect-scroll',

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.js');
      app.import('node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css');
    }
  }
};
