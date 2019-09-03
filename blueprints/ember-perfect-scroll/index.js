/*jshint node:true*/
module.exports = {
  description: 'Component wrapper for perfect-scrollbar',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us
  },

  afterInstall: function() {
    return this.addPackageToProject('perfect-scrollbar');
  }
};
