import EmberObject, { set } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { Promise } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/components/semantic-ui-kinetic-form';
import Changeset from 'ember-changeset';
import { isChangeset } from 'validated-changeset';

module('Integration | Component | semantic ui kinetic form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    set(this, 'testModel', EmberObject.create());
    set(this, 'submitSpy', sinon.spy());
  });

  test('renders different form fields from definition schema', async function (assert) {
    set(this, 'testDefinition', {
      schema: {
        type: 'object',
        properties: {
          fieldA: { type: 'boolean' },
          fieldB: { type: 'number' },
          fieldC: { type: 'radios' },
          fieldD: { type: 'string' },
          fieldE: { type: 'textarea' },
        },
      },
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.booleanField.isVisible,
      'expected boolean field to be visible'
    );
    assert.ok(
      page.numberField.isVisible,
      'expected number field to be visible'
    );
    assert.ok(
      page.radiosField.isVisible,
      'expected radios field to be visible'
    );
    assert.ok(
      page.stringField.isVisible,
      'expected string field to be visible'
    );
    assert.ok(
      page.textareaField.isVisible,
      'expected textarea field to be visible'
    );
  });

  test('render string field as default type', async function (assert) {
    set(this, 'testDefinition', {
      schema: { type: 'object', properties: { fieldA: { type: 'foobar' } } },
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.stringField.isVisible,
      'expected string field to be visible'
    );
  });

  test('can override components', async function (assert) {
    set(this, 'testDefinition', {
      schema: {
        type: 'object',
        properties: {
          fieldA: { type: 'number' },
          fieldB: { type: 'foobar' },
        },
      },
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          numberComponent="semantic-ui-kinetic-form/boolean"
          foobarComponent="semantic-ui-kinetic-form/radios"
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.booleanField.isVisible,
      'expected boolean field to be visible'
    );
    assert.ok(
      page.radiosField.isVisible,
      'expected radios field to be visible'
    );
  });

  test('shows errors section when changeset has errors', async function (assert) {
    let mockChangeset = new Changeset({});
    mockChangeset.addError('base', 'test-error');
    set(this, 'testDefinition', { schema: { type: 'object', properties: {} } });
    set(this, 'mockChangeset', mockChangeset);
    await render(hbs`
      {{semantic-ui-kinetic-form
          showErrors=true
          changesetOverride=this.mockChangeset
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.errorsSection.isVisible,
      'expected errors section to be visible'
    );
  });

  test('overrides field type from form section of definition', async function (assert) {
    set(this, 'testDefinition', {
      schema: {
        type: 'object',
        properties: {
          fieldA: { type: 'boolean' },
        },
      },
      form: [
        {
          key: 'fieldA',
          type: 'radios',
        },
      ],
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.notOk(
      page.booleanField.isVisible,
      'expected boolean field to not be visible'
    );
    assert.ok(
      page.radiosField.isVisible,
      'expected radios field to be visible'
    );
  });

  test('marks fields as required when listed in required section of schema', async function (assert) {
    set(this, 'testDefinition', {
      schema: {
        type: 'object',
        required: ['fieldB'],
        properties: {
          fieldA: { type: 'boolean' },
          fieldB: { type: 'string' },
        },
      },
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.notOk(
      page.booleanField.isRequired,
      'expected fieldA to not be highlited as required'
    );
    assert.ok(
      page.stringField.isRequired,
      'expected fieldB to be highlited as required'
    );
  });

  test('displays a form title from title section of schema', async function (assert) {
    set(this, 'testDefinition', {
      schema: { type: 'object', title: 'test-title', properties: {} },
    });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.strictEqual(page.form.title, 'test-title');
  });

  test('calls onSubmit action when user submits the form', async function () {
    set(this, 'testDefinition', { schema: { type: 'object', properties: {} } });
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    await page.submit();
    sinon.assert.calledWith(
      this.submitSpy,
      sinon.match(isChangeset, 'Changeset')
    );
  });

  test('shows loading component when passed a promise', async function (assert) {
    let promise = new Promise(() => {});
    set(this, 'testDefinition', promise);
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.loading.isVisible,
      'expected loading component to be visible'
    );
    assert.ok(page.form.isHidden, 'expected form component to be hidden');
  });

  test('shows loading component when passed a PromiseProxyMixin', async function (assert) {
    let proxy = ObjectProxy.extend(PromiseProxyMixin, {
      // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
      promise: new Promise(() => {}),
    });
    let promise = proxy.create();
    set(this, 'testDefinition', promise);
    await render(hbs`
      {{semantic-ui-kinetic-form
          definition=this.testDefinition
          model=this.testModel
          onSubmit=(action this.submitSpy)}}
    `);
    assert.ok(
      page.loading.isVisible,
      'expected loading component to be visible'
    );
    assert.ok(page.form.isHidden, 'expected form component to be hidden');
  });
});
