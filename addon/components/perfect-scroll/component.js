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

var _scrollPositionComputer = {
  get(key) {
    return get(this, `_${key}`) || 0;
  },
  set(key, value) {
    set(this, `_${key}`, value);
    run.schedule('afterRender', () => {
      get(this, '_scrollElement')[key] = value;
      window.Ps.update(get(this, '_scrollElement'));
    });
  }
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
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  includePadding: false,
  theme: 'default',

  _scrollTop: 0,
  _scrollLeft: 0,

  scrollTop:  computed('_scrollTop',  _scrollPositionComputer),
  scrollLeft: computed('_scrollLeft', _scrollPositionComputer),

  scrolled(evt) {
    this.setProperties({
      "_scrollTop": evt.target.scrollTop,
      "_scrollLeft": evt.target.scrollLeft
    });
  },

  didInsertElement() {
    this._super(...arguments);

    run.schedule('afterRender', () => {
      window.Ps.initialize($(`#${get(this, 'eId')}`)[0], this._getOptions());

      // TODO: This should possibly be put somewhere else.
      // Ideally, this handler would wrap any ps-scroll-y or -x handlers and call them after it's done.
      $(get(this, "_scrollElement")).on('ps-scroll-y ps-scroll-x', (e) => {
        get(this, "scrolled").call(this, e);
      });

      this.bindEvents();
    });
  },

  didRender() {
    let el = document.getElementById(get(this, 'eId'));
    window.Ps.update(el);
  },

  willDestroyElement() {
    this._super(...arguments);

    let element = document.getElementById(get(this, 'eId'));

    if (element) {
      window.Ps.destroy(element);
    }

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

  _scrollElement: Ember.computed('eId', function() {
    return document.getElementById(get(this, 'eId'));
  }),

  /**
   * Binds perfect-scrollbar events to function
   * and then calls related events if user gives the action
   */
  bindEvents() {
    let self = this;
    let mapping = {};
    let el = document.getElementById(get(this, 'eId'));

    psEvents.map(evt => {
      mapping[evt] = function() {
        self.callEvent(evt);
      };

      $(el).on(evt, mapping[evt].bind(this));
    });

    set(this, 'mapping', mapping);
  },

  /**
   * Calls perfect-scrollbar
   * @param  {String} evt perfect-scrollbar event name
   */
  callEvent(evt) {
    if (isPresent(get(this, evt))) {
      this.sendAction(evt);
    }
  },

  /**
   * Unbinds all event listeners
   */
  unbindEvents() {
    let mapping = get(this, 'mapping');
    let el = document.getElementById(get(this, 'eId'));

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
