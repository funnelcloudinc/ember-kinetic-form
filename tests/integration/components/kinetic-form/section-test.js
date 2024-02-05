import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { default as settled } from 'ember-test-helpers/wait';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import page, { pageWithSubSection } from '../../../pages/components/kinetic-form/section';

const { run, set } = Ember;

moduleForComponent('kinetic-form/section', 'Integration | Component | kinetic form/section', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('displays field.title', function(assert) {
  set(this, 'testField', {title: 'test title'});
  page.render(hbs`{{kinetic-form/section field=testField}}`);
  assert.ok(page.hasInTitle('test title'), 'expected field.title to be displayed');
});

test('displays provides a linkable anchor', function(assert) {
  set(this, 'testField', {title: 'test title'});
  page.render(hbs`{{kinetic-form/section field=testField}}`);
  assert.equal(page.anchor, 'test-title');
});

test('displays section items', function (assert) {
  set(this, 'testField', {
    title: 'test-title',
    items: [
      { key: '1', type: 'instructions', title: '1. Heat\n2. Pour', componentName: 'semantic-ui-kinetic-form/instructions' },
      { key: '2', type: 'passfail', title: 'To be or not', required: false, componentName: 'semantic-ui-kinetic-form/passfail' },
      { key: '3', type: 'boolean', title: 'Reality [] box', required: true, componentName: 'semantic-ui-kinetic-form/boolean' },
    ]
  });
  set(this, 'noop', function() {})
  page.render(hbs`{{kinetic-form/section field=testField update=noop updateAction=noop}}`);

  assert.ok(page.contains('1. Heat\n2. Pour'), 'expected form element 1 to be rendered');
  assert.ok(page.contains('To be or not'), 'expected form element 2 to be rendered');
  assert.ok(page.contains('Reality [] box'), 'expected form element 3 to be rendered');
});

test('displays sub-sections', function (assert) {
  set(this, 'testField', {
    title: 'test-title',
    items: [
      { key: '1', type: 'instructions', title: '1. Heat\n2. Pour', componentName: 'semantic-ui-kinetic-form/instructions' },
      {
        type: 'section',
        title: 'sub-section',
        required: false,
        componentName: 'kinetic-form/section',
        items: [
          { key: '2', type: 'passfail', title: 'To be or not', required: false, componentName: 'semantic-ui-kinetic-form/passfail' },
          { key: '3', type: 'boolean', title: 'Reality [] box', required: true, componentName: 'semantic-ui-kinetic-form/boolean' },
        ]
      }
    ]
  });
  set(this, 'noop', function() {})
  page.render(hbs`<div id="test-parent">{{kinetic-form/section field=testField update=noop updateAction=noop}}</div>`);

  assert.ok(pageWithSubSection.contains('1. Heat\n2. Pour'), 'expected form element 1 to be rendered');
  assert.ok(pageWithSubSection.contains('sub-section'), 'expected sub-section title to be rendered');
  assert.ok(pageWithSubSection.contains('To be or not'), 'expected form element 2 to be rendered');
  assert.ok(pageWithSubSection.contains('Reality [] box'), 'expected form element 3 to be rendered');
});

test('passes through the update action', function () {
  const updateActionSpy = sinon.spy();
  set(this, 'updateAction', updateActionSpy);
  set(this, 'noop', function () {});
  set(this, 'testField', {
    title: 'test-title',
    items: [
      {
        type: 'section',
        title: 'sub-section',
        required: false,
        componentName: 'kinetic-form/section',
        items: [
          {
            key: '1',
            type: 'boolean',
            title: 'Is it complete',
            required: true,
            componentName: 'kinetic-form/boolean',
          },
        ],
      },
    ],
  });

  page.render(hbs`<div id="test-parent">{{kinetic-form/section field=testField updateAction=updateAction update=noop}}</div>`);

  run(() => pageWithSubSection.booleanField.toggle());
  settled();

  sinon.assert.calledWith(
    updateActionSpy,
    '1', // key
    true,  // value
  );
});