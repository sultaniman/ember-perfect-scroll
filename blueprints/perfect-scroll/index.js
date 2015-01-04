module.exports = {
  description: 'Component wrapper for perfect-scrollbar',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('perfect-scrollbar');
  }
};
