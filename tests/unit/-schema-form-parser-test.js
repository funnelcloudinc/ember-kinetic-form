import { module, test } from 'qunit';
import sinon from 'sinon';
import SchemaFormParser from 'ember-kinetic-form/-schema-form-parser';

module('Unit | Schema Form Parser', function() {
  test('throws exception with unsupported schema type', function(assert) {
    assert.throws(() => {
      SchemaFormParser.create({ schema: { type: 'unsupported' } });
    });
  });

  test('proxies data from schema', function(assert) {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        title: 'test-title',
        required: ['test'],
        properties: { '1': {} }
      }
    });
    assert.equal(subject.get('type'), 'object');
    assert.equal(subject.get('title'), 'test-title');
    assert.deepEqual(subject.get('required'), ['test']);
    assert.deepEqual(subject.get('properties'), {'1': {}});
  });

  test('parses empty form data', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      }
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo' }),
      sinon.match({ key: '2', type: 'boolean', title: 'bar' }),
      sinon.match({ key: '3', type: 'boolean', title: 'baz' })
    ]);
  });

  test('parses reordered form data', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      },
      form: ['2', '1', '3']
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '2', type: 'boolean', title: 'bar' }),
      sinon.match({ key: '1', type: 'boolean', title: 'foo' }),
      sinon.match({ key: '3', type: 'boolean', title: 'baz' })
    ]);
  });

  test('parses form data with a wildcard', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      },
      form: ['*', { type: 'submit' }]
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo' }),
      sinon.match({ key: '2', type: 'boolean', title: 'bar' }),
      sinon.match({ key: '3', type: 'boolean', title: 'baz' }),
      sinon.match({ type: 'submit', required: false })
    ]);
  });

  test('parses required keys', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        required: ['2'],
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      }
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo', required: false }),
      sinon.match({ key: '2', type: 'boolean', title: 'bar', required: true }),
      sinon.match({ key: '3', type: 'boolean', title: 'baz', required: false })
    ]);
  });

  test('parses form elements with items list', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      },
      form: ["1", { type: 'section', items: ['2', '3'] }]
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo' }),
      sinon.match({
        type: 'section',
        items: [
          sinon.match({ key: '2', type: 'boolean', title: 'bar' }),
          sinon.match({ key: '3', type: 'boolean', title: 'baz' })
        ]
      })
    ]);
  });

  test('parses backwards compatible form data', function() {
    let subject = SchemaFormParser.create({
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      },
      form: [{ key: '2', type: 'radio' }]
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo' }),
      sinon.match({ key: '2', type: 'radio', title: 'bar' }),
      sinon.match({ key: '3', type: 'boolean', title: 'baz' })
    ]);
  });
});
