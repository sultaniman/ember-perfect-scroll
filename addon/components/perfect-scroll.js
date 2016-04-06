import Ember from 'ember';
import layout from '../templates/components/perfect-scroll';


const {
  $:$,
  on,
  get,
  set,
  run,
  computed,
  isEmpty,
  guidFor
} = Ember;


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

  _renderPerfectScroll: on('didInsertElement', function() {
    run.schedule("afterRender", this, () => {
      let elementId = `#${get(this, 'eId')}`;
      window.Ps.initialize($(elementId)[0], this._getOptions());
    });
  }),

  _destroyPerfectScroll: on('willDestroyElement', function() {
    let el = document.getElementById(get(this, 'eId'));
    window.Ps.destroy(el);
  }),

  eId: computed('scrollId', {
    get() {
      if (isEmpty(get(this, 'scrollId'))) {
          set(this, 'scrollId', `perfect-scroll-${guidFor(this)}`);
      }

      return get(this, 'scrollId');
    }
  }).readOnly(),

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
