import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/select';
import sinon from 'sinon';

module('Integration | Component | kinetic form/select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    set(this, 'updateSpy', sinon.spy());
  });

  test('displays field.title', async function(assert) {
    set(this, 'testField', {title: 'test-title'});
    await render(hbs`{{kinetic-form/select field=this.testField update=(action this.updateSpy)}}`);
    assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
  });

  test('highlights as required when field.required is true', async function(assert) {
    set(this, 'testField', {required: false});
    await render(hbs`{{kinetic-form/select field=this.testField update=(action this.updateSpy)}}`);
    assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
    run(() => set(this, 'testField.required', true));
    assert.ok(page.isRequired, 'expected component to be highlighted as required');
  });

  test('shows the current value', async function(assert) {
    set(this, 'testField', {options: ['foo', 'test-value', 'bar']});
    await render(hbs`{{kinetic-form/select value="test-value" field=this.testField update=(action this.updateSpy)}}`);
    assert.equal(page.selectedValue, 'test-value');
  });

  test('calls update action when user enters text', async function() {
    set(this, 'testField', {options: ['foo', 'test-text', 'bar']});
    await render(hbs`{{kinetic-form/select field=this.testField update=(action this.updateSpy)}}`);
    await page.select('test-text');
    sinon.assert.calledWith(this.updateSpy, 'test-text');
  });

  test('highlights as an error when error is truthy', async function(assert) {
    set(this, 'testField', {options: ['foo', 'test-text', 'bar']});
    set(this, 'testError', null);
    await render(hbs`{{kinetic-form/select field=this.testField error=this.testError update=(action this.updateSpy)}}`);
    assert.notOk(page.hasError, 'expected to not have error highlight');
    run(() => set(this, 'testError', {message: 'test-error'}));
    assert.ok(page.hasError, 'expected to have error highlight');
  });
});
