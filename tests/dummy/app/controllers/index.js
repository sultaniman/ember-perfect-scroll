import Ember from 'ember';

export default Ember.Controller.extend({
  scrollTop: 50,
  scrollLeft: 50,
  actions: {
    yReachEnd() {
      /* eslint-disable no-console */
      console.log('ps-y-reach-end');
    },

    scrollX() {
      /* eslint-disable no-console */
      console.log('ps-scroll-x');
    },

    scrollY() {
      /* eslint-disable no-console */
      console.log('ps-scroll-y');
    },
  }
});
