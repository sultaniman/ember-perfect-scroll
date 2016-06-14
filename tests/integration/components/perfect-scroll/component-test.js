import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders with content "ps"', function(assert) {
  this.render(hbs`{{#perfect-scroll}}ps{{/perfect-scroll}}`);
  assert.equal(this.$().text().trim(), 'ps');
});
