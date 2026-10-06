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

  test('messages name the field by its title, not its key', function (assert) {
    const [selected] = validatorsFor({
      key: '7',
      title: 'Hoses inspected for wear',
      required: true,
      type: 'boolean',
    });
    assert.strictEqual(
      selected('7', false),
      'Hoses inspected for wear must be selected'
    );

    const [present] = validatorsFor({
      key: '8',
      title: 'Reason for visit',
      required: true,
      type: 'string',
    });
    assert.strictEqual(present('8', ''), "Reason for visit can't be blank");
  });

  test('messages fall back to the key when there is no title', function (assert) {
    const [selected] = validatorsFor({
      key: 'confirmed',
      required: true,
      type: 'radios',
    });
    assert.strictEqual(
      selected('confirmed', null),
      'confirmed must be selected'
    );
  });
});
