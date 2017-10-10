import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('perfect-scroll', 'Integration | Component | perfect scroll', {
  integration: true
});

test('it renders with content "ps"', function(assert) {
  this.render(hbs`{{#perfect-scroll}}ps{{/perfect-scroll}}`);
  assert.equal(this.$().text().trim(), 'ps');
});

test('it responds to perfect scroll update request', function (assert) {
  this.render(hbs`
    <style>
      .ps-content { position:relative; margin:0px auto; padding:0px; width: 100px; height: 100px; overflow: auto}
      .ps-content .content {width: 400px; height: 400px}
    </style>
    {{#perfect-scroll as |ps|}}
      <div class="content"></div>
    {{/perfect-scroll}}`);

  assert.equal(this.$('.ps').css('height'), 'ps');

});
