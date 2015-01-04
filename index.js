/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-perfectscroll',

  included: function(app) {
    this._super.included(app);
 
    app.import('bower_components/perfect-scrollbar/src/perfect-scrollbar.js');
    app.import('bower_components/perfect-scrollbar/src/perfect-scrollbar.css');
  }
};
