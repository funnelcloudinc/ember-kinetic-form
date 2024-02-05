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
      lookupComponentName: (type) => `kinetic-form/${type}`,
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'boolean', title: 'baz' }
        }
      },
      form: ['1', { type: 'section', title: 'my-section', items: ['2', '3'] }],
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo', required: false }),
      sinon.match({
        type: 'section',
        title: 'my-section',
        items: [
          sinon.match({ key: '2', type: 'boolean', title: 'bar', required: false, componentName: 'kinetic-form/boolean' }),
          sinon.match({ key: '3', type: 'boolean', title: 'baz', required: false, componentName: 'kinetic-form/boolean' }),
        ],
      }),
    ]);
  });

  test('Adds componentName properties using lookup function', function() {
    let subject = SchemaFormParser.create({
      lookupComponentName: (type) => `${type}-test-component-name`,
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'boolean', title: 'foo' },
          '2': { type: 'string', title: 'bar' },
          '3': { type: 'number', title: 'baz' }
        }
      }
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'boolean', title: 'foo', componentName: 'boolean-test-component-name' }),
      sinon.match({ key: '2', type: 'string', title: 'bar', componentName: 'string-test-component-name'}),
      sinon.match({ key: '3', type: 'number', title: 'baz', componentName: 'number-test-component-name'})
    ]);
  });

  test('parses backwards compatible form data', function() {
    let subject = SchemaFormParser.create({
      lookupComponentName: (type) => `${type}-test-component-name`,
      schema: {
        type: 'object',
        properties: {
          '1': { type: 'string', title: 'foo' },
          '2': { type: 'boolean', title: 'bar' },
          '3': { type: 'number', title: 'baz' }
        }
      },
      form: [{ key: '2', type: 'radio' }]
    });
    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '1', type: 'string', title: 'foo', componentName: 'string-test-component-name' }),
      sinon.match({ key: '2', type: 'radio', title: 'bar', componentName: 'radio-test-component-name' }),
      sinon.match({ key: '3', type: 'number', title: 'baz', componentName: 'number-test-component-name' })
    ]);
  });

  test('parses sub-sections and their names', function() {
    let subject = SchemaFormParser.create({
      lookupComponentName: (type) => `kinetic-form/${type}`,
      schema: {
        type: "object",
        title: "Get refreshed!",
        required: ["3"],
        properties: {
          1: { formtype: "instructions", type: "instructions", section: "following", title: "1. Heat\n2. Pour" },
          2: { formtype: "passfail", type: "passfail", title: "To be or not", required: false },
          3: { formtype: "textarea", type: "string", section: "sub-section", title: "Let's see what happens", required: true }
        }
      },
      form: [
        { key: "2", type: "passfail" },
        { 
          type: "section",
          title: "following",
          items: [
            { key: "1", type: "instructions" },
            {
              type: "section",
              title: "sub-section",
              items: [{ key: "3", type: "textarea" }]
            }
          ]
        }
      ]
    });

    sinon.assert.match(subject.get('elements'), [
      sinon.match({ key: '2', type: 'passfail', title: 'To be or not', required: false, componentName: 'kinetic-form/passfail' }),
      sinon.match({
        type: 'section',
        title: 'following',
        required: false,
        componentName: 'kinetic-form/section',
        items: [
          sinon.match({ key: '1', type: 'instructions', title: '1. Heat\n2. Pour', required: false, componentName: 'kinetic-form/instructions' }),
          sinon.match({
            type: 'section',
            title: 'sub-section',
            required: false,
            componentName: 'kinetic-form/section',
            items: [
              sinon.match({ key: '3', type: 'textarea', title: 'Let\'s see what happens', required: true, componentName: 'kinetic-form/textarea' }),
            ]
          })
        ],
      }),
    ]);
  });

  test('parses deep section nesting', function() {
    let subject = SchemaFormParser.create({
      lookupComponentName: (type) => `kinetic-form/${type}`,
      schema: {
        type: "object",
        title: "Get refreshed!",
        required: ["3"],
        properties: {
          1: { formtype: "instructions", type: "instructions", section: "following", title: "1. Heat\n2. Pour" },
          2: { formtype: "passfail", type: "passfail", title: "To be or not", required: false },
          3: { formtype: "textarea", type: "string", section: "sub-section", title: "Let's see what happens", required: true }
        }
      },
      form: [
        { 
          type: "section",
          title: "following",
          items: [
            { key: "1", type: "instructions" },
            {
              type: "section",
              title: "sub-section",
              items: [
                { key: "3", type: "textarea" },
                {
                  type: "section",
                  title: "deep-sub-section",
                  items: [
                    { key: "2", type: "passfail" }
                  ]
                }
    
              ]
            }
          ]
        }
      ]
    });

    sinon.assert.match(subject.get('elements'), [
      sinon.match({
        type: 'section',
        title: 'following',
        required: false,
        componentName: 'kinetic-form/section',
        items: [
          sinon.match({ key: '1', type: 'instructions', title: '1. Heat\n2. Pour', required: false, componentName: 'kinetic-form/instructions' }),
          sinon.match({
            type: 'section',
            title: 'sub-section',
            required: false,
            componentName: 'kinetic-form/section',
            items: [
              sinon.match({ key: '3', type: 'textarea', title: 'Let\'s see what happens', required: true, componentName: 'kinetic-form/textarea' }),
              sinon.match({
                type: 'section',
                title: 'deep-sub-section',
                required: false,
                componentName: 'kinetic-form/section',
                items: [
                  sinon.match({ key: '2', type: 'passfail', title: 'To be or not', required: false, componentName: 'kinetic-form/passfail' }),
                ]
              })
            ]
          })
        ],
      }),
    ]);
  });
});
