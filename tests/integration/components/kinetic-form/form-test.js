import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/form';
import sinon from 'sinon';

const { run, set } = Ember;

moduleForComponent('kinetic-form/form', 'Integration | Component | kinetic form/form', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('yields a block', function (assert) {
  page.render(hbs`{{#kinetic-form/form}}Test block content{{/kinetic-form/form}}`);
  assert.ok(page.text.includes('Test block content'), 'expected component to render block content');
});

test('displays a title', function(assert) {
  page.render(hbs`{{kinetic-form/form title="test-title"}}`);
  assert.equal(page.title, 'test-title');
});

test('disables submit button when isInvalid is true', function (assert) {
  page.render(hbs`{{kinetic-form/form isInvalid=false}}`);
  assert.ok(page.submitButton.isEnabled, 'expected submit button to be enabled');
  page.render(hbs`{{kinetic-form/form isInvalid=true}}`);
  assert.ok(page.submitButton.isDisabled, 'expected submit button to be disabled');
});

test('calls onSubmit action when user clicks submit button', function () {
  let onSubmitSpy = sinon.spy();
  set(this, 'onSubmitSpy', onSubmitSpy);
  page.render(hbs`{{kinetic-form/form onSubmit=(action onSubmitSpy)}}`);
  run(() => page.submitButton.click());
  sinon.assert.calledOnce(onSubmitSpy);
});
