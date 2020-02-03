import EmberObject from '@ember/object';
import PerfectScrollControllerMixin from 'ember-perfect-scroll-action-fixed/mixins/perfect-scroll-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | perfect scroll controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let PerfectScrollControllerObject = EmberObject.extend(PerfectScrollControllerMixin);
  let subject = PerfectScrollControllerObject.create();
  assert.ok(subject);
});
