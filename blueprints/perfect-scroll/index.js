module.exports = {
  description: 'Component wrapper for perfect-scrollbar'

  afterInstall: function(options) {
    return this.addBowerPackageToProject('perfect-scrollbar');
  }
};
