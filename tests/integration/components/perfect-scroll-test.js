import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{perfect-scroll}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#perfect-scroll}}
      template block text
    {{/perfect-scroll}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
