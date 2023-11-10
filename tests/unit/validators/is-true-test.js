import { typeOf } from '@ember/utils';
import { module, test } from 'qunit';
import validateIsTrue from 'ember-kinetic-form/validators/is-true';

module('Unit | Validators | is-true', function () {
  test('validates value is true or not', function (assert) {
    let subject = validateIsTrue();
    assert.strictEqual(typeOf(subject), 'function');
    assert.notOk(subject('foo', 'bork'), 'expected return value to be false');
    assert.notOk(subject('foo', {}), 'expected return value to be false');
    assert.notOk(subject('foo', 1), 'expected return value to be false');
    assert.notOk(subject('foo', false), 'expected return value to be false');
    assert.ok(subject('foo', true), 'expected return value to be true');
  });
});
