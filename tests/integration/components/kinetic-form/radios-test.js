import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/radios';
import sinon from 'sinon';

module('Integration | Component | kinetic form/radios', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    set(this, 'updateSpy', sinon.spy());
  });

  test('displays field.title', async function (assert) {
    set(this, 'testField', { title: 'test-title' });
    await render(
      hbs`{{kinetic-form/radios field=this.testField update=(action this.updateSpy)}}`
    );
    assert.ok(
      page.hasInTitle('test-title'),
      'expected field.title to be displayed'
    );
  });

  test('highlights as required when field.required is true', async function (assert) {
    set(this, 'testField', { required: false });
    await render(
      hbs`{{kinetic-form/radios field=this.testField update=(action this.updateSpy)}}`
    );
    assert.notOk(
      page.isRequired,
      'expected component to not be highlighted as required'
    );
    run(() => set(this, 'testField.required', true));
    assert.ok(
      page.isRequired,
      'expected component to be highlighted as required'
    );
  });

  test('shows the current value', async function (assert) {
    set(this, 'testValue', true);
    await render(
      hbs`{{kinetic-form/radios value=this.testValue update=(action this.updateSpy)}}`
    );
    assert.ok(page.isOn, 'expected on button to be active');
    assert.notOk(page.isOff, 'expected off button to not be active');
    run(() => set(this, 'testValue', false));
    assert.notOk(page.isOn, 'expected on button to not be active');
    assert.ok(page.isOff, 'expected off button to be active');
  });

  test('calls update action when user enters text', async function () {
    await render(hbs`{{kinetic-form/radios update=(action this.updateSpy)}}`);
    await page.turnOn();
    sinon.assert.calledWith(this.updateSpy, true);
    await page.turnOff();
    sinon.assert.calledWith(this.updateSpy, false);
  });

  test('highlights as an error when error is truthy', async function (assert) {
    set(this, 'testError', null);
    await render(
      hbs`{{kinetic-form/radios error=this.testError update=(action this.updateSpy)}}`
    );
    assert.notOk(page.hasError, 'expected to not have error highlight');
    run(() => set(this, 'testError', { message: 'test-error' }));
    assert.ok(page.hasError, 'expected to have error highlight');
  });
});
