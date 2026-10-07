import { typeOf } from '@ember/utils';
import { module, test } from 'qunit';
import validateIsTrue from 'ember-kinetic-form/validators/is-true';

module('Unit | Validators | is-true', function () {
  test('validates value is true or not', function (assert) {
    const subject = validateIsTrue();
    const errorMessagePattern = /must be selected/;

    assert.strictEqual(typeOf(subject), 'function');
    assert.ok(
      errorMessagePattern.test(subject('foo', 'bork')),
      'expected return value to be false'
    );
    assert.ok(
      errorMessagePattern.test(subject('foo', {})),
      'expected return value to be false'
    );
    assert.ok(
      errorMessagePattern.test(subject('foo', 1)),
      'expected return value to be false'
    );
    assert.ok(
      errorMessagePattern.test(subject('foo', false)),
      'expected return value to be false'
    );
    assert.ok(subject('foo', true), 'expected return value to be true');
  });

  test('names the field when given a name', function (assert) {
    const subject = validateIsTrue('Ball screws greased');

    assert.strictEqual(
      subject('23', false),
      'Ball screws greased must be selected'
    );
    assert.true(subject('23', true));
  });
});
