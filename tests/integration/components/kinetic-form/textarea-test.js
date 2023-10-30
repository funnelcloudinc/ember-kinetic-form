import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/textarea';
import sinon from 'sinon';

module('Integration | Component | kinetic form/textarea', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    page.setContext(this);
    set(this, 'updateSpy', sinon.spy());
  });

  hooks.afterEach(function() {
    page.removeContext();
  });

  test('displays field.title', async function(assert) {
    set(this, 'testField', {title: 'test-title'});
    await render(hbs`{{kinetic-form/textarea field=testField update=(action updateSpy)}}`);
    assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
  });

  test('highlights as required when field.required is true', async function(assert) {
    set(this, 'testField', {required: false});
    await render(hbs`{{kinetic-form/textarea field=testField update=(action updateSpy)}}`);
    assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
    run(() => set(this, 'testField.required', true));
    assert.ok(page.isRequired, 'expected component to be highlighted as required');
  });

  test('shows the current value', async function(assert) {
    await render(hbs`{{kinetic-form/textarea value="test-value" update=(action updateSpy)}}`);
    assert.ok(/test-value/.test(page.value), 'expected textarea to contain "test-value"');
  });

  test('calls update action when user enters text', async function() {
    await render(hbs`{{kinetic-form/textarea update=(action updateSpy)}}`);
    run(() => page.enterText('test-text'));
    sinon.assert.calledWith(this.updateSpy, 'test-text');
  });

  test('highlights as an error when error is truthy', async function(assert) {
    set(this, 'testError', null);
    await render(hbs`{{kinetic-form/textarea error=testError update=(action updateSpy)}}`);
    assert.notOk(page.hasError, 'expected to not have error highlight');
    run(() => set(this, 'testError', {message: 'test-error'}));
    assert.ok(page.hasError, 'expected to have error highlight');
  });
});
