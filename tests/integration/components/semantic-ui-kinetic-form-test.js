import EmberObject, { set, get } from '@ember/object';
import { run } from '@ember/runloop';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { Promise } from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/components/semantic-ui-kinetic-form';
import Changeset from 'ember-changeset';
import isChangeset from 'ember-changeset/utils/is-changeset';

moduleForComponent('semantic-ui-kinetic-form', 'Integration | Component | semantic ui kinetic form', {
  integration: true,

  beforeEach() {
    page.setContext(this);
    set(this, 'testModel', EmberObject.create());
    set(this, 'submitSpy', sinon.spy());
  },

  afterEach() {
    page.removeContext();
  }
});

test('renders different form fields from definition schema', function (assert) {
  set(this, 'testDefinition', {
    schema: {
      type: 'object',
      properties: {
        fieldA: {type: 'boolean'},
        fieldB: {type: 'number'},
        fieldC: {type: 'radios'},
        fieldD: {type: 'string'},
        fieldE: {type: 'textarea'}
      }
    }
  });
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.booleanField.isVisible, 'expected boolean field to be visible');
  assert.ok(page.numberField.isVisible, 'expected number field to be visible');
  assert.ok(page.radiosField.isVisible, 'expected radios field to be visible');
  assert.ok(page.stringField.isVisible, 'expected string field to be visible');
  assert.ok(page.textareaField.isVisible, 'expected textarea field to be visible');
});

test('render string field as default type', function (assert) {
  set(this, 'testDefinition', {
    schema: {type: 'object', properties: {fieldA: {type: 'foobar'}}}
  });
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.stringField.isVisible, 'expected string field to be visible');
});

test('can override components', function (assert) {
  set(this, 'testDefinition', {
    schema: {
      type: 'object',
      properties: {
        fieldA: {type: 'number'},
        fieldB: {type: 'foobar'}
      }
    }
  });
  page.render(hbs`
    {{semantic-ui-kinetic-form
        numberComponent="semantic-ui-kinetic-form/boolean"
        foobarComponent="semantic-ui-kinetic-form/radios"
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.booleanField.isVisible, 'expected boolean field to be visible');
  assert.ok(page.radiosField.isVisible, 'expected radios field to be visible');
});

test('shows errors section when changeset has errors', function (assert) {
  let mockChangeset = new Changeset({});
  mockChangeset.addError('base', 'test-error');
  set(this, 'testDefinition', {schema: {type: 'object', properties: {}}});
  set(this, 'mockChangeset', mockChangeset);
  page.render(hbs`
    {{semantic-ui-kinetic-form
        showErrors=true
        changeset=mockChangeset
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.errorsSection.isVisible, 'expected errors section to be visible');
});

test('overrides field type from form section of definition', function (assert) {
  set(this, 'testDefinition', {
    schema: {
      type: 'object',
      properties: {
        fieldA: {type: 'boolean'}
      }
    },
    form: [
      {
        key: 'fieldA',
        type: 'radios'
      }
    ]
  });
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.notOk(page.booleanField.isVisible, 'expected boolean field to not be visible');
  assert.ok(page.radiosField.isVisible, 'expected radios field to be visible');
});

test('marks fields as required when listed in required section of schema', function (assert) {
  set(this, 'testDefinition', {
    schema: {
      type: 'object',
      required: ['fieldB'],
      properties: {
        fieldA: {type: 'boolean'},
        fieldB: {type: 'string'}
      }
    }
  });
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.notOk(page.booleanField.isRequired, 'expected fieldA to not be highlited as required');
  assert.ok(page.stringField.isRequired, 'expected fieldB to be highlited as required');
});

test('displays a form title from title section of schema', function (assert) {
  set(this, 'testDefinition', {schema: {type: 'object', title: 'test-title', properties: {}}});
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.equal(page.form.title, 'test-title');
});

test('calls onSubmit action when user submits the form', function () {
  set(this, 'testDefinition', {schema: {type: 'object', properties: {}}});
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  run(() => page.submit());
  sinon.assert.calledWith(get(this, 'submitSpy'), sinon.match(isChangeset, 'Changeset'));
});

test('shows loading component when passed a promise', function (assert) {
  let promise = new Promise(() => {});
  set(this, 'testDefinition', promise);
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.loading.isVisible, 'expected loading component to be visible');
  assert.ok(page.form.isHidden, 'expected form component to be hidden');
});

test('shows loading component when passed a PromiseProxyMixin', function (assert) {
  let proxy = ObjectProxy.extend(PromiseProxyMixin, {
    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    promise: new Promise(() => {})
  });
  let promise = proxy.create();
  set(this, 'testDefinition', promise);
  page.render(hbs`
    {{semantic-ui-kinetic-form
        definition=testDefinition
        model=testModel
        onSubmit=(action submitSpy)}}
  `);
  assert.ok(page.loading.isVisible, 'expected loading component to be visible');
  assert.ok(page.form.isHidden, 'expected form component to be hidden');
});
