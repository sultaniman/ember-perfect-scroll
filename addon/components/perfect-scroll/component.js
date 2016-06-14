import Ember from 'ember';
import layout from './template';


const {
  $,
  on,
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

let prop = function(key) {
	return get(this, key);
};

export default Ember.Component.extend({
  layout: layout,

  // Internal id for element
  scrollId: null,

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

  onInsert: on('didInsertElement', function() {
    this._super(...arguments);
    prop = prop.bind(this);
    window.Ps.initialize($(`#${prop('eId')}`)[0], this._getOptions());
    this.bindEvents();
  }),

  onDestroy: on('willDestroyElement', function() {
    this._super(...arguments);
    window.Ps.destroy(document.getElementById(prop('eId')));
    this.unbindEvents();
  }),

  eId: computed('scrollId', {
    get() {
      if (isEmpty(get(this, 'scrollId'))) {
        set(this, 'scrollId', `perfect-scroll-${guidFor(this)}`);
      }

      return get(this, 'scrollId');
    }
  }).readOnly(),

  bindEvents() {
    let self = this;
    let mapping = {};
    
    psEvents.map(evt => {
      let el = $(document.getElementById(prop('eId')));

      mapping[evt] = function() {
        self.callEvent(evt);
      };

      $(el).on(evt, mapping[evt].bind(self));
    });

    set(this, 'mapping', mapping);
  },

  callEvent(evt) {
    if (isPresent(prop(evt))) {
      this.sendAction(evt);
    }
  },

  unbindEvents() {
    let eventMappings = prop('mapping');

    psEvents.map(evt => {
      let el = $(document.getElementById(prop('eId')));
      $(el).off(evt, run.cancel(this, eventMappings[evt]));
    });
  },

  _getOptions() {
    return {
      wheelSpeed            : prop('wheelSpeed'),
      wheelPropagation      : prop('wheelPropagation'),
      swipePropagation      : prop('swipePropagation'),
      minScrollbarLength    : prop('minScrollbarLength'),
      maxScrollbarLength    : prop('maxScrollbarLength'),
      useBothWheelAxes      : prop('useBothWheelAxes'),
      useKeyboard           : prop('useKeyboard'),
      suppressScrollX       : prop('suppressScrollX'),
      suppressScrollY       : prop('suppressScrollY'),
      scrollXMarginOffset   : prop('scrollXMarginOffset'),
      scrollYMarginOffset   : prop('scrollYMarginOffset'),
      includePadding        : prop('includePadding'),
      scrollTop             : prop('scrollTop'),
      scrollLeft            : prop('scrollLeft')
    };
  }
});
