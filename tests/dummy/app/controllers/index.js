import Ember from 'ember';
import PerfectScrollController from 'ember-perfect-scroll/mixins/perfect-scroll-controller';

export default Ember.Controller.extend(PerfectScrollController,{
  deneme: function () {

  },
  actions: {
    yReachEnd() {
      /* eslint-disable no-console */
      console.log('ps-y-reach-end');
    },

    scrollX() {
      /* eslint-disable no-console */
      console.log('ps-scroll-x');
    },

    scrollY(val) {
      /* eslint-disable no-console */
      console.log('ps-scroll-y');
      console.log(val);
    },

    maximizeHeight() {
      Ember.$('.content').height(720);
      this.updatePerfectScroll();
    },

    performScroll() {
      this.performScroll(undefined, 35);
    },

    maximizeHeight2() {
      Ember.$('.content').height(720);
      this.updatePerfectScroll();
    },

    performScroll2() {
      this.performScroll(78, 1500, 'foo');
    },
  }
});
