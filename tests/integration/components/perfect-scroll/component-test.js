import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders with content "ps"', function(assert) {
  this.render(hbs`{{#perfect-scroll}}ps{{/perfect-scroll}}`);
  assert.equal(this.$().text().trim(), 'ps');
});

test('it renders with scroll positions', function(assert) {
  this.render(hbs`{{#perfect-scroll scrollTop=50 scrollLeft=75}}<div style="height:1000px; width:1000px;"></div>{{/perfect-scroll}}`);
  assert.equal(this.$(".ps-content").scrollTop(), 50);
  assert.equal(this.$(".ps-content").scrollLeft(), 75);
});

test('it renders with scroll positions, and updates when properties are changed', function(assert) {
  this.set("scrollTopPosition", 125);
  this.set("scrollLeftPosition", 150);

  this.render(hbs`
    {{#perfect-scroll scrollTop=scrollTopPosition scrollLeft=scrollLeftPosition}}
      <div style="height:1000px; width:1000px;"></div>
    {{/perfect-scroll}}
  `);
  assert.equal(this.$(".ps-content").scrollTop(), 125);
  assert.equal(this.$(".ps-content").scrollLeft(), 150);

  this.set("scrollTopPosition", 200);
  this.set("scrollLeftPosition", 225);

  assert.equal(this.$(".ps-content").scrollTop(), 200);
  assert.equal(this.$(".ps-content").scrollLeft(), 225);
});

test('it renders with scroll positions, and properties update when scroll is changed', function(assert) {
  this.set("scrollTopPosition", 100);
  this.set("scrollLeftPosition", 125);

  this.render(hbs`
    {{#perfect-scroll scrollTop=scrollTopPosition scrollLeft=scrollLeftPosition}}
      <div style="height:1000px; width:1000px;"></div>
    {{/perfect-scroll}}
  `);
  var scrollElement = this.$(".ps-content");

  assert.equal(scrollElement.scrollTop(), 100);
  assert.equal(scrollElement.scrollLeft(), 125);

  // This must be run after first render, so that perfect-scrollbar can remember the originally rendered position for comparison after we change it.
  // Must be in a run loop, or else Ember complains.
  Ember.run(function() {
    window.Ps.update(scrollElement[0]);
  });

  scrollElement.scrollTop(50);
  scrollElement.scrollLeft(75);

  // Update the perfect-scrollbar object, firing events as needed.
  Ember.run(function() {
    window.Ps.update(scrollElement[0]);
  });

  assert.equal(this.get("scrollTopPosition"), 50);
  assert.equal(this.get("scrollLeftPosition"), 75);
});
