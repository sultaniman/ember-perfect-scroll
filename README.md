# Ember-perfectscroll

[![Build Status: Linux](https://travis-ci.org/imanhodjaev/ember-perfect-scroll.svg?branch=master)]

This README outlines the details of collaborating on this Ember addon.

## Intro
This is just a wrapper as an Ember component around [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar).

## Installation

* `npm install --save-dev ember-perfectscroll`
* `ember g perfect-scroll`

## Using
You can pass its options as they are defined for `perfect-scrollbar` plugin
```hbs
{{#perfect-scroll wheelSpeed=2}}
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

## Issues

If you will face issues related to `perfect-scrollbar` using `ember g perfect-scroll` then manually install it.

`bower install perfect-scrollbar`

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

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
