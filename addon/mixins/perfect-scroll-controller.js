import { A } from '@ember/array';
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.initializePerfecScrollArray();
  },

  initializePerfecScrollArray() {
    this.set('perfectScrolls', A());
  },

  getPerfectScroll(perfectScrollId) {
    if (isEmpty(this.get('perfectScrolls'))) {
      return null;
    }

    if (isEmpty(perfectScrollId)) {
      return this.get('perfectScrolls')[0];
    }

    return this.get('perfectScrolls').filter(item=>get(item, 'element.id')===perfectScrollId)[0];
  },

  updatePerfectScroll(perfectScrollId) {
    let perfectScroll = this.getPerfectScroll(perfectScrollId);

    if (isPresent(perfectScroll)) {

      perfectScroll.update();
    }
  },

  performScroll(scrollLeft, scrollTop, perfectScrollId) {
    let perfectScroll = this.getPerfectScroll(perfectScrollId);

    if (isEmpty(perfectScroll)) {
      return;
    }

    if (isPresent(scrollLeft)) {
      perfectScroll.element.scrollLeft = scrollLeft;
    }

    if (isPresent(scrollTop)) {
      perfectScroll.element.scrollTop = scrollTop;
    }
  },

  actions: {
    lifeCycleEventOccurred(perfectScroll, eventName) {
      if (eventName === 'initialized') {
        get(this, 'perfectScrolls').pushObject(perfectScroll);
      } else {
        get(this, 'perfectScrolls').removeObject(perfectScroll);
      }
    }
  }
});
