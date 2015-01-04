import Ember from 'ember';

export default Ember.Component.extend({
    scrollId: null,

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

    renderPerfectScroll: function() {
        var self = this;

        this.$(eId).perfectScrollbar({
            wheelSpeed: self.get('wheelSpeed'),
            wheelPropagation: self.get('wheelPropagation'),
            swipePropagation: self.get('swipePropagation'),
            minScrollbarLength: self.get('minScrollbarLength'),
            maxScrollbarLength: self.get('maxScrollbarLength'),
            useBothWheelAxes: self.get('useBothWheelAxes'),
            useKeyboard: self.get('useKeyboard'),
            suppressScrollX: self.get('suppressScrollX'),
            suppressScrollY: self.get('suppressScrollY'),
            scrollXMarginOffset: self.get('scrollXMarginOffset'),
            scrollYMarginOffset: self.get('scrollYMarginOffset'),
            includePadding: self.get('includePadding')
        });
    }.on('didInsertElement'),

    eId: function() {
        if (Ember.isEmpty(this.get('scrollId'))) {
            this.set('scrollId', 'perfect-scroll-' + this.getScrollId(););
        }

        return this.get('scrollId');
    }.property('scrollId'),

    getScrollId: function() {
        return Math.floor(Math.random() * 1000);
    }
});
