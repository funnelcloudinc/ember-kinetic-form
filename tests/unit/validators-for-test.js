import { isArray } from '@ember/array';
import { typeOf, isNone } from '@ember/utils';
import { module, test } from 'qunit';
import validatorsFor from 'ember-kinetic-form/-validators-for';

module('Unit | validatorsFor', function () {
  test('returns undefined when fields are not required', function (assert) {
    assert.ok(
      isNone(validatorsFor({ required: false, type: 'string' })),
      'expected undefined'
    );
    assert.ok(
      isNone(validatorsFor({ required: false, type: 'boolean' })),
      'expected undefined'
    );
    assert.ok(
      isNone(validatorsFor({ required: false, type: 'radios' })),
      'expected undefined'
    );
    assert.ok(
      isNone(validatorsFor({ required: false, type: 'number' })),
      'expected undefined'
    );
    assert.ok(
      isNone(validatorsFor({ required: false, type: 'textarea' })),
      'expected undefined'
    );
  });

  test('returns validators for fields when required', function (assert) {
    let result;
    result = validatorsFor({ required: true, type: 'string' });
    assert.ok(isArray(result), 'expected an array');
    assert.ok(
      result.every((r) => typeOf(r) === 'function'),
      'expected an array of functions'
    );

    result = validatorsFor({ required: true, type: 'boolean' });
    assert.ok(isArray(result), 'expected an array');
    assert.ok(
      result.every((r) => typeOf(r) === 'function'),
      'expected an array of functions'
    );

    result = validatorsFor({ required: true, type: 'radios' });
    assert.ok(isArray(result), 'expected an array');
    assert.ok(
      result.every((r) => typeOf(r) === 'function'),
      'expected an array of functions'
    );

    result = validatorsFor({ required: true, type: 'number' });
    assert.ok(isArray(result), 'expected an array');
    assert.ok(
      result.every((r) => typeOf(r) === 'function'),
      'expected an array of functions'
    );

    result = validatorsFor({ required: true, type: 'textarea' });
    assert.ok(isArray(result), 'expected an array');
    assert.ok(
      result.every((r) => typeOf(r) === 'function'),
      'expected an array of functions'
    );
  });
});
