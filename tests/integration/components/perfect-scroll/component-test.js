import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PerfectScrollControllerMixin from 'ember-perfect-scroll/mixins/perfect-scroll-controller';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

const {get, set} = Ember;

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders with content "ps"', function(assert) {
  this.render(hbs`{{#perfect-scroll}}ps{{/perfect-scroll}}`);
  assert.equal(this.$().text().trim(), 'ps');
});


test('it fires ps-scroll-y, ps-scroll-x, ps-scroll-up, ps-scroll-left, ps-y-reach-start, ps-x-reach-start as expected', function (assert) {
  clearEventCounts(this);
  addHandlerForEvent(this, assert, 'ps-scroll-y', [200, 0]);
  addHandlerForEvent(this, assert, 'ps-y-reach-start', [0]);
  addHandlerForEvent(this, assert, 'ps-scroll-up', [0]);
  addHandlerForEvent(this, assert, 'ps-scroll-x', [200, 0]);
  addHandlerForEvent(this, assert, 'ps-x-reach-start', [0]);
  addHandlerForEvent(this, assert, 'ps-scroll-left', [0]);


  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll scrollTop=200 scrollLeft=200
      ps-scroll-y=(action 'ps-scroll-y') ps-y-reach-start=(action 'ps-y-reach-start')
      ps-scroll-up=(action 'ps-scroll-up') ps-scroll-left=(action 'ps-scroll-left')
      ps-scroll-x=(action 'ps-scroll-x') ps-x-reach-start=(action 'ps-x-reach-start')}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  let scrollElement = this.$('.ps-content');
  assert.expect(8);

  return wait().then(()=> {
    scrollVertical(scrollElement, 0);
    scrollHorizontal(scrollElement, 0);
  });
});


test('it fires ps-scroll-y, ps-scroll-x, ps-scroll-down, ps-scroll-right, ps-y-reach-end, ps-x-reach-end as expected', function (assert) {
  clearEventCounts(this);
  addHandlerForEvent(this, assert, 'ps-scroll-y', [300]);
  addHandlerForEvent(this, assert, 'ps-y-reach-end', [300]);
  addHandlerForEvent(this, assert, 'ps-scroll-down', [300]);
  addHandlerForEvent(this, assert, 'ps-scroll-x', [300]);
  addHandlerForEvent(this, assert, 'ps-x-reach-end', [300]);
  addHandlerForEvent(this, assert, 'ps-scroll-right', [300]);


  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll ps-scroll-y=(action 'ps-scroll-y') ps-y-reach-end=(action 'ps-y-reach-end')
      ps-scroll-down=(action 'ps-scroll-down') ps-scroll-right=(action 'ps-scroll-right')
      ps-scroll-x=(action 'ps-scroll-x') ps-x-reach-end=(action 'ps-x-reach-end')}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  let scrollElement = this.$('.ps-content');
  assert.expect(6);

  return wait().then(()=> {
    scrollVertical(scrollElement, 400);
    scrollHorizontal(scrollElement, 400);
  });
});

test("it scrolls programmatically via perfect-scroll-controller mixin", function (assert) {
  /**
   * Make test context have necessary action via applying mixin; since init of mixin will not be run; run the initialization
   * method of mixin for array creation.
   */
  PerfectScrollControllerMixin.apply(this);
  this.initializePerfecScrollArray();
  assert.expect(2);

  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll lifeCycleEventOccurred=(action 'lifeCycleEventOccurred')}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  // Perform scrolling
  this.performScroll(150, 200);

  let scrollElement = this.$('.ps-content');
  assert.equal(scrollElement.scrollLeft(), 150);
  assert.equal(scrollElement.scrollTop(), 200);
});

test("it scrolls two different perfect scrolls programmatically with respect to scroll ids", function (assert) {
  /**
   * Make test context have necessary action via applying mixin; since init of mixin will not be run; run the initialization
   * method of mixin for array creation.
   */
  PerfectScrollControllerMixin.apply(this);
  this.initializePerfecScrollArray();
  assert.expect(6);

  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll scrollId='first' lifeCycleEventOccurred=(action 'lifeCycleEventOccurred')}}
      <div class="content"></div>
    {{/perfect-scroll}}
    {{#perfect-scroll scrollId='second' lifeCycleEventOccurred=(action 'lifeCycleEventOccurred')}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  // Performing scroll without specifying id will scroll first perfect scroll
  this.performScroll(150, 200);
  let firstElement = this.$('#first');
  assert.equal(firstElement.scrollLeft(), 150);
  assert.equal(firstElement.scrollTop(), 200);

  // Performing scroll via id will scroll corresponding perfect scroll
  // Performing scroll via id will scroll corresponding perfect scroll
  this.performScroll(200, 150, 'second');
  let secondElement = this.$('#second');
  assert.equal(secondElement.scrollLeft(), 200);
  assert.equal(secondElement.scrollTop(), 150);

  this.performScroll(80, 80, 'first');
  assert.equal(firstElement.scrollLeft(), 80);
  assert.equal(firstElement.scrollTop(), 80);
});

test('initial scrollLeft and scrollTop positions are respected', function (assert) {
  assert.expect(4);

  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll scrollId='first'}}
      <div class="content"></div>
    {{/perfect-scroll}}
    {{#perfect-scroll scrollId='second' scrollTop=20 scrollLeft=200}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  let firstElement = this.$('#first');
  let secondElement = this.$('#second');

  assert.equal(firstElement.scrollLeft(), 0, "First element's initial scroll left should have been 0 since value is not passed from outside");
  assert.equal(firstElement.scrollTop(), 0, "First element's initial scroll top should have been 0 since value is not passed from outside");

  assert.equal(secondElement.scrollLeft(), 200, "Second element's initial scroll left should have been 20 since value is passed from outside");
  assert.equal(secondElement.scrollTop(), 20, "Second element's initial scroll top should have been 20 since value is passed from outside");
});

test("it updates perfect scroll via perfect-scroll-controller mixin", function (assert) {
  /**
   * Make test context have necessary action via applying mixin; since init of mixin will not be run; run the initialization
   * method of mixin for array creation.
   */
  PerfectScrollControllerMixin.apply(this);
  this.initializePerfecScrollArray();
  // Do not know why we are receiving ps-y-reach-end twice in case container height is changed; but we receive the event
  // anyway from perfect-scrollbar
  assert.expect(2);

  set(this.get('actions'), 'ps-y-reach-end', (scrollPosition)=>assert.equal(scrollPosition, 200, 'Container height ' +
    'change should have been reflected upon caliing updatePerfectScrollBar'));

  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll scrollTop=300 lifeCycleEventOccurred=(action 'lifeCycleEventOccurred') ps-y-reach-end=(action 'ps-y-reach-end')}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  let content = this.$('.ps-content');

  content.height(200);
  this.updatePerfectScroll();

  return wait();
});


/**
 * Initializes event counts to 0 back again
 */
function clearEventCounts(testContext) {
  set(testContext, 'eventCounts', {
    'ps-scroll-y' : 0,
    'ps-scroll-x': 0,
    'ps-scroll-up': 0,
    'ps-scroll-down': 0,
    'ps-scroll-left': 0,
    'ps-scroll-right': 0,
    'ps-y-reach-start': 0,
    'ps-y-reach-end': 0,
    'ps-x-reach-start': 0,
    'ps-x-reach-end': 0
  });
}

/**
 * Add a generic event handler for each scrolling event to be fired by perfect scroll.
 *
 * @param testContext, the test context
 * @param assert, qunit's assert to check expectations
 * @param eventName, name of the event fired
 * @param expectedScrollPositionValues, scroll position values expected to be received in order
 */
function addHandlerForEvent(testContext, assert, eventName, expectedScrollPositionValues) {
  testContext.on(eventName, (scrollPosition)=> {
    let eventCount = get(testContext,`eventCounts.${eventName}`);
    set(testContext, `eventCounts.${eventName}`, eventCount+1)
    performAssertionForEvent(assert, scrollPosition, expectedScrollPositionValues[eventCount], eventName, eventCount+1);
  });
}

/**
 * Generic assertion method to perform actual scroll position value checking with an understandable message
 *
 * @param assert, qunit's assert to check expectations
 * @param actualScrollPosition, scroll's actual position
 * @param expectedScrollPosition, expected value for scroll's position
 * @param eventName, name of the event fired
 */
function performAssertionForEvent(assert, actualScrollPosition, expectedScrollPosition, eventName) {
  assert.equal(actualScrollPosition, expectedScrollPosition, `${eventName} assertion failed`);
}

/**
 * Method to force scrolling of the corresponding perfect scroll element vertically
 *
 * @param scrollElement, the element to be scrolled
 * @param scrollPosition, new scroll position
 */
function scrollVertical(scrollElement, scrollPosition) {
  scrollElement.scrollTop(scrollPosition);
}

/**
 * Method to force scrolling of the corresponding perfect scroll element horizontally
 *
 * @param scrollElement, the element to be scrolled
 * @param scrollPosition, new scroll position
 */
function scrollHorizontal(scrollElement, scrollPosition) {
  scrollElement.scrollLeft(scrollPosition);
}

