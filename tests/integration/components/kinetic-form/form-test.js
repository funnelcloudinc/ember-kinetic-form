import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/form';
import sinon from 'sinon';

module('Integration | Component | kinetic form/form', function(hooks) {
  setupRenderingTest(hooks);

  test('yields a block', async function(assert) {
    await render(hbs`{{#kinetic-form/form}}Test block content{{/kinetic-form/form}}`);
    assert.ok(page.text.includes('Test block content'), 'expected component to render block content');
  });

  test('displays a title', async function(assert) {
    await render(hbs`{{kinetic-form/form title="test-title"}}`);
    assert.equal(page.title, 'test-title');
  });

  test('disables submit button when isInvalid is true', async function(assert) {
    await render(hbs`{{kinetic-form/form isInvalid=false}}`);
    assert.ok(page.submitButton.isEnabled, 'expected submit button to be enabled');
    await render(hbs`{{kinetic-form/form isInvalid=true}}`);
    assert.ok(page.submitButton.isDisabled, 'expected submit button to be disabled');
  });

  test('calls onSubmit action when user clicks submit button', async function() {
    let onSubmitSpy = sinon.spy();
    set(this, 'onSubmitSpy', onSubmitSpy);
    await render(hbs`{{kinetic-form/form onSubmit=(action onSubmitSpy)}}`);
    run(() => page.submitButton.click());
    sinon.assert.calledOnce(onSubmitSpy);
  });
});
