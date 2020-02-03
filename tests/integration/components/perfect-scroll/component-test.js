import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PerfectScrollControllerMixin from 'ember-perfect-scroll-action-fixed/mixins/perfect-scroll-controller';
import $ from 'jquery';

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders with content "ps"', function(assert) {
  this.render(hbs`{{#perfect-scroll}}ps{{/perfect-scroll}}`);
  assert.equal($('.ps-content').text().trim(), 'ps');
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

  let scrollElement = $('.ps-content');
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
  let firstElement = $('#first');
  assert.equal(firstElement.scrollLeft(), 150);
  assert.equal(firstElement.scrollTop(), 200);

  // Performing scroll via id will scroll corresponding perfect scroll
  // Performing scroll via id will scroll corresponding perfect scroll
  this.performScroll(200, 150, 'second');
  let secondElement = $('#second');
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

  let firstElement = $('#first');
  let secondElement = $('#second');

  assert.equal(firstElement.scrollLeft(), 0, "First element's initial scroll left should have been 0 since value is not passed from outside");
  assert.equal(firstElement.scrollTop(), 0, "First element's initial scroll top should have been 0 since value is not passed from outside");

  assert.equal(secondElement.scrollLeft(), 200, "Second element's initial scroll left should have been 20 since value is passed from outside");
  assert.equal(secondElement.scrollTop(), 20, "Second element's initial scroll top should have been 20 since value is passed from outside");
});

