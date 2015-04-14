module.exports = {
  description: 'Component wrapper for perfect-scrollbar',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('perfect-scrollbar');
  }
};
