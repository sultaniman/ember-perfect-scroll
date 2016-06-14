import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
  	yReachEnd() {
  		console.log('ps-y-reach-end');
  	},

  	scrollX() {
  		console.log('ps-scroll-x');
  	},

  	scrollY() {
  		console.log('ps-scroll-y');
  	},
  }
});
