'use strict';

const path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon : function(){
    return true;
  },
  hintingEnabled: function() {
    return false;
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('node_modules/perfect-scrollbar/dist/perfect-scrollbar.js');
      app.import('node_modules/perfect-scrollbar/css/perfect-scrollbar.css');
    }
  }
};
