import Ember from 'ember';
import layout from './template';


const {
  $,
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

  didInsertElement() {
    this._super(...arguments);
    console.log('didInsertElement', get(this, 'eId'));

    run.schedule('afterRender', () => {
      try {
        window.Ps.initialize($(`#${get(this, 'eId')}`)[0], this._getOptions());
        this.bindEvents();
      } catch (e) {
        console.log(get(this, 'eId'), e);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    window.Ps.destroy(document.getElementById(get(this, 'eId')));
    this.unbindEvents();
  },

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
    let el = $(document.getElementById(get(this, 'eId')));
    
    psEvents.map(evt => {
      mapping[evt] = function() {
        self.callEvent(evt);
      };

      $(el).on(evt, mapping[evt].bind(this));
    });

    set(this, 'mapping', mapping);
  },

  callEvent(evt) {
    if (isPresent(get(this, evt))) {
      this.sendAction(evt);
    }
  },

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
      scrollTop             : get(this, 'scrollTop'),
      scrollLeft            : get(this, 'scrollLeft')
    };
  }
});
