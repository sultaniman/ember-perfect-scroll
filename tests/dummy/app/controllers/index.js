import Ember from 'ember';
import PerfectScrollController from 'ember-perfect-scroll/mixins/perfect-scroll-controller';

export default Ember.Controller.extend(PerfectScrollController,{
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

    changeContainerHeightTo500() {
      Ember.$('.ps-content').height(500);
      this.updatePerfectScroll();
    },

    performScrollTo150_150() {
      this.performScroll(150, 150);
    },
  }
});
