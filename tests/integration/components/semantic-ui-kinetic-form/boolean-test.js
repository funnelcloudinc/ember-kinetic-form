import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/boolean';
import sinon from 'sinon';

module('Integration | Component | semantic ui kinetic form/boolean', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    set(this, 'updateSpy', sinon.spy());
  });

  test('displays field.title', async function(assert) {
    set(this, 'testField', {title: 'test-title'});
    await render(hbs`{{semantic-ui-kinetic-form/boolean field=this.testField update=(action this.updateSpy)}}`);
    assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
  });

  test('highlights as required when field.required is true', async function(assert) {
    set(this, 'testField', {required: false});
    await render(hbs`{{semantic-ui-kinetic-form/boolean field=this.testField update=(action this.updateSpy)}}`);
    assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
    run(() => set(this, 'testField.required', true));
    assert.ok(page.isRequired, 'expected component to be highlighted as required');
  });

  test('shows the current value', async function(assert) {
    await render(hbs`{{semantic-ui-kinetic-form/boolean value=true update=(action this.updateSpy)}}`);
    assert.ok(page.isChecked, 'expected to be marked as checked');
  });

  test('calls update action when user enters text', async function() {
    await render(hbs`{{semantic-ui-kinetic-form/boolean update=(action this.updateSpy)}}`);
    await page.toggle();
    sinon.assert.calledWith(this.updateSpy, true);
  });

  test('highlights as an error when error is truthy', async function(assert) {
    set(this, 'testError', null);
    await render(hbs`{{semantic-ui-kinetic-form/boolean error=this.testError update=(action this.updateSpy)}}`);
    assert.notOk(page.hasError, 'expected to not have error highlight');
    run(() => set(this, 'testError', {message: 'test-error'}));
    assert.ok(page.hasError, 'expected to have error highlight');
  });
});
