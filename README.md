# Ember-perfectscroll

![Build Status: Linux](https://travis-ci.org/imanhodjaev/ember-perfect-scroll.svg?branch=master)

## Intro
This is just a wrapper as an Ember component around [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar).

## Installation
* `ember install ember-perfectscroll`
* `ember g ember-perfect-scroll`

## Using
You can pass its options as they are defined for `perfect-scrollbar` plugin
```hbs
{{#perfect-scroll}}
    CONTENTS
{{/perfect-scroll}}
```

## Important on CSS classes
CSS classes a provided by [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar)

1. `ps-container`
2. `ps-active-x`
3. `ps-active-y`

Addon provides only `ps-content` class alongside with default classes.

As an example you can use dummy app for tests under `tests/dummy`

`bower install perfect-scrollbar`

## Scroll events
perfect-scrollbar dispatches its own custom events. For each event type; the current value of the scroll position for 
the corresponding axis is dispatched as the first parameter of the event.

In summary; the `value` dispatched for
`ps-scroll-y`, `ps-scroll-up`, `ps-scroll-down`, `ps-y-reach-start`, and `ps-y-reach-end` events is the current scroll 
position of the vertical scroll bar; where as it is the current scroll position of the horizontal scroll bar for 
`ps-scroll-y`, `ps-scroll-up`, `ps-scroll-down`, `ps-y-reach-start`, and `ps-y-reach-end` events.  

### ps-scroll-y
This event fires when the y-axis is scrolled in either direction.

### ps-scroll-x
This event fires when the x-axis is scrolled in either direction.

### ps-scroll-up
This event fires when scrolling upwards.

### ps-scroll-down
This event fires when scrolling downwards.

### ps-scroll-left
This event fires when scrolling to the left.

### ps-scroll-right
This event fires when scrolling to the right.

### ps-y-reach-start
This event fires when scrolling reaches the start of the y-axis.

### ps-y-reach-end
This event fires when scrolling reaches the end of the y-axis (useful for infinite scroll).

### ps-x-reach-start
This event fires when scrolling reaches the start of the x-axis.

### ps-x-reach-end
This event fires when scrolling reaches the end of the x-axis.

To use them just pass the event name and bound your action
```hbs
{{#perfect-scroll ps-y-reach-end=(action 'yReachEnd')}}
    CONTENTS
{{/perfect-scroll}}
```

## PerfectScrollBarController
[perfect-scrollbar](hhttps://github.com/utatti/perfect-scrollbar#how-to-use) requires to call `update` in case the size 
of the container or the content changes. In order to enable calling `update` for underlying perfect scroll component you
should make use of `PerfectScrollBarController` mixin. This mixin contains a method called `updatePerfectScroll` that 
takes an optional `scrollId` parameter (which you can pass to the `perfect-scroll` within the template). If `scrolldId` 
parameter is omitted; the first `perfect-scroll` being controlled is updated. Please take a look at the following code 
snippet in order to update the scroll bar programmatically in case an update is needed due to content or container size 
change.

```hbs
{{#perfect-scroll lifeCycleEventOccurred=(action 'lifeCycleEventOccurred')}}
    CONTENTS
{{/perfect-scroll}}
```

```javascript
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
```

`PerfectScrollController` mixin needs to be imported from `ember-perfect-scroll/mixins/perfect-scroll-controller` and 
should be injected to a relevant construct such as controller (as in the snippet above), a route or a component. 
`perfect-scroll`'s `lifeCycleEventOccurred` event needs to be handled via 
`lifeCycleEventOccurred=(action 'lifeCycleEventOccurred')` declaration within the template. By this way; the mixin's 
relevant code gets notified about initialization and destroy phases of  `perfect-scroll` and you should be able to call 
`updatePerfectScroll` when needed.

Another useful method provided by `PerfectScrollController` mixin is `performScroll`. As the name implies, scrolling to 
desired scrollbar positions should be performed via this method. It takes three arguments:
1. `scrollLeft`: new scroll position for horizontal scrollbar. Pass `undefined` if no update is desired for x-axis.
2. `scrollTop`: new scroll position for vertical scrollbar. Pass `undefined` if no update is desired for y-axis.
3. `scrolldId`: Optional parameter to identify the `perfect-scroll` to be scrolled. First `perfect-scrollbar` being 
controlled is applied scrolling if this parameter is omitted.
##

## Optional parameters

#### wheelSpeed
The scroll speed applied to mousewheel event.
**Default: 1**

#### wheelPropagation
If this option is true, when the scroll reaches the end of the side, mousewheel event will be propagated to parent element.
**Default: false**

#### swipePropagation
If this option is true, when the scroll reaches the end of the side, touch scrolling will be propagated to parent element.
**Default: true**

#### minScrollbarLength
When set to an integer value, the thumb part of the scrollbar will not shrink below that number of pixels.
**Default: null**

#### maxScrollbarLength
When set to an integer value, the thumb part of the scrollbar will not expand over that number of pixels.
**Default: null**

#### useBothWheelAxes
When set to true, and only one (vertical or horizontal) scrollbar is visible then both vertical and horizontal scrolling will affect the scrollbar.
**Default: false**

#### useKeyboard
When set to true, the scroll works with arrow keys on the keyboard. The element is scrolled only when the mouse cursor hovers the element.
**Default: true**

#### suppressScrollX
When set to true, the scroll bar in X axis will not be available, regardless of the content width.
**Default: false**

#### suppressScrollY
When set to true, the scroll bar in Y axis will not be available, regardless of the content height.
**Default: false**

#### scrollXMarginOffset
The number of pixels the content width can surpass the container width without enabling the X axis scroll bar. Allows some "wiggle room" or "offset break", so that X axis scroll bar is not enabled just because of a few pixels.
**Default: 0**

#### scrollYMarginOffset
The number of pixels the content height can surpass the container height without enabling the Y axis scroll bar. Allows some "wiggle room" or "offset break", so that Y axis scroll bar is not enabled just because of a few pixels.
**Default: 0**

#### includePadding
When set to true, it uses `innerWidth` and `innerHeight` for the container size instead of `width` and `height`. When your container element has non-zero padding and the scrollbar layout looks weird, this option can be helpful.
**Default: false**

### theme
A string. It's a class name added to the container element. The class name is prepended with `ps-theme-`. So default theme class name is `ps-theme-default`. In order to create custom themes with scss use `ps-container($theme)` mixin, where `$theme` is a scss map.
**Default**: `'default'`

**Example 1:**

Add `theme` parameter:
```javascript
Ps.initialize(container, {
  theme: 'my-theme-name'
});
```

Get more information about [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar).
For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
