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
