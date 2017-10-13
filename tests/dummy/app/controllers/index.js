import Ember from 'ember';
import PerfectScrollController from 'ember-perfect-scroll/mixins/perfect-scroll-controller';

export default Ember.Controller.extend(PerfectScrollController,{
  deneme: function () {

  },
  actions: {
    yReachEnd(scrollPosition) {
      /* eslint-disable no-console */
      console.log(`ps-y-reach-end - ${scrollPosition}`);
    },

    scrollX(scrollPosition) {
      /* eslint-disable no-console */
      console.log(`ps-scroll-x - ${scrollPosition}`);
    },

    scrollY(scrollPosition) {
      /* eslint-disable no-console */
      console.log(`ps-scroll-y - ${scrollPosition}`);
    },

    changeContainerHeight() {
      Ember.$('.ps-content').height(500);
      this.updatePerfectScroll();
    },

    performScroll() {
      this.performScroll(150, 150);
    },
  }
});
