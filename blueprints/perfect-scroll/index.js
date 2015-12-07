module.exports = {
  description: 'Component wrapper for perfect-scrollbar',

  normalizeEntityName: function() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('perfect-scrollbar');
  }
};
