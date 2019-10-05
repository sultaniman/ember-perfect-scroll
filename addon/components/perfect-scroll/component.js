import Ember from 'ember';
import layout from './template';

const {
  get,
  set,
  run,
  isPresent,
  computed,
  isEmpty,
  guidFor
} = Ember;

// Perfect Scrollbar scroll events
const psEvents = [
  'ps-scroll-y',
  'ps-scroll-x',
  'ps-scroll-up',
  'ps-scroll-down',
  'ps-scroll-left',
  'ps-scroll-right',
  'ps-y-reach-start',
  'ps-y-reach-end',
  'ps-x-reach-start',
  'ps-x-reach-end'
];

// Perfect Scrollbar scroll events, scroll value type mapping
const psEventsScrollValueTypeMapping = {
  'ps-scroll-y' : 'scrollTop',
  'ps-scroll-x': 'scrollLeft',
  'ps-scroll-up': 'scrollTop',
  'ps-scroll-down': 'scrollTop',
  'ps-scroll-left': 'scrollLeft',
  'ps-scroll-right': 'scrollLeft',
  'ps-y-reach-start': 'scrollTop',
  'ps-y-reach-end': 'scrollTop',
  'ps-x-reach-start': 'scrollLeft',
  'ps-x-reach-end': 'scrollLeft',
};

export default Ember.Component.extend({

  layout: layout,

  // Internal id for element
  scrollId: null,

  // Internal perfect-scrollbar
  _perfectScrollbar: null,

  // Perfect scrollbar related settings
  wheelSpeed: 1,
  wheelPropagation: false,
  swipePropagation: true,
  minScrollbarLength: null,
  maxScrollbarLength: null,
  useBothWheelAxes: false,
  useKeyboard: true,
  suppressScrollX: false,
  suppressScrollY: false,
  scrollTop: 0,
  scrollLeft: 0,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  includePadding: false,
  theme: 'default',

  didInsertElement() {
    this._super(...arguments);

    run.schedule('afterRender', () => {
      let element = this.getElementForPs();

      this.set('_perfectScrollbar', new window.PerfectScrollbar(element, this._getOptions()));

      // reflect initial scrollLeft and scrollTop positions to the element
      element.scrollLeft = this.get('scrollLeft');
      element.scrollTop = this.get('scrollTop');

      this.bindEvents();
      this.triggerLifeCycleAction('initialized');
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    let perfectScrollbar = this.get('_perfectScrollbar');

    if (perfectScrollbar) {
      perfectScrollbar.destroy();
      this.set('_perfectScrollbar', null);
    }

    this.unbindEvents();
    this.triggerLifeCycleAction('willBeDestroyed');
  },

  triggerLifeCycleAction(eventName) {
    let lifeCycleEventOccurred = this.get('lifeCycleEventOccurred') || function(){};
    lifeCycleEventOccurred(this.get('_perfectScrollbar'), eventName);
  },

  getElementForPs() {
    return document.getElementById(get(this, 'eId'));
  },

  eId: computed('scrollId', {
    get() {
      if (isEmpty(get(this, 'scrollId'))) {
        set(this, 'scrollId', `perfect-scroll-${guidFor(this)}`);
      }

      return get(this, 'scrollId');
    }
  }).readOnly(),

  /**
   * Binds perfect-scrollbar events to function
   * and then calls related events if user gives the action
   */
  bindEvents() {
    let self = this;
    let mapping = {};
    let el = this.getElementForPs();

    psEvents.map(evt => {
      mapping[evt] = function() {
        self.callEvent(evt, get(el, psEventsScrollValueTypeMapping[evt]));
      };

      $(el).on(evt, mapping[evt].bind(this));
    });

    set(this, 'mapping', mapping);
  },

  /**
   * Calls perfect-scrollbar
   * @param  {String} evt perfect-scrollbar event name
   * @param {Number} value
   */
  callEvent(evt, value) {
    if (isPresent(get(this, evt))) {
      run.next(this, ()=>this.sendAction(evt, value));
    }
  },

  /**
   * Unbinds all event listeners
   */
  unbindEvents() {
    let mapping = get(this, 'mapping');
    let el = $(document.getElementById(get(this, 'eId')));

    psEvents.map(evt => {
      $(el).off(evt, run.cancel(this, mapping[evt].bind(this)));
    });
  },

  _getOptions() {
    return {
      wheelSpeed            : get(this, 'wheelSpeed'),
      wheelPropagation      : get(this, 'wheelPropagation'),
      swipePropagation      : get(this, 'swipePropagation'),
      minScrollbarLength    : get(this, 'minScrollbarLength'),
      maxScrollbarLength    : get(this, 'maxScrollbarLength'),
      useBothWheelAxes      : get(this, 'useBothWheelAxes'),
      useKeyboard           : get(this, 'useKeyboard'),
      suppressScrollX       : get(this, 'suppressScrollX'),
      suppressScrollY       : get(this, 'suppressScrollY'),
      scrollXMarginOffset   : get(this, 'scrollXMarginOffset'),
      scrollYMarginOffset   : get(this, 'scrollYMarginOffset'),
      includePadding        : get(this, 'includePadding'),
      theme                 : get(this, 'theme'),
    };
  }
});
