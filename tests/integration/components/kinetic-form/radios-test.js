import { run } from '@ember/runloop';
import { get, set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/radios';
import sinon from 'sinon';

moduleForComponent('kinetic-form/radios', 'Integration | Component | kinetic form/radios', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'updateSpy', sinon.spy());
  },
  afterEach() {
    page.removeContext();
  }
});

test('displays field.title', function(assert) {
  set(this, 'testField', {title: 'test-title'});
  page.render(hbs`{{kinetic-form/radios field=testField update=(action updateSpy)}}`);
  assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
});

test('highlights as required when field.required is true', function(assert) {
  set(this, 'testField', {required: false});
  page.render(hbs`{{kinetic-form/radios field=testField update=(action updateSpy)}}`);
  assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
  run(() => set(this, 'testField.required', true));
  assert.ok(page.isRequired, 'expected component to be highlighted as required');
});

test('shows the current value', function(assert) {
  set(this, 'testValue', true);
  page.render(hbs`{{kinetic-form/radios value=testValue update=(action updateSpy)}}`);
  assert.ok(page.isOn, 'expected on button to be active');
  assert.notOk(page.isOff, 'expected off button to not be active');
  run(() => set(this, 'testValue', false));
  assert.notOk(page.isOn, 'expected on button to not be active');
  assert.ok(page.isOff, 'expected off button to be active');
});

test('calls update action when user enters text', function() {
  page.render(hbs`{{kinetic-form/radios update=(action updateSpy)}}`);
  run(() => page.turnOn());
  sinon.assert.calledWith(get(this, 'updateSpy'), true);
  run(() => page.turnOff());
  sinon.assert.calledWith(get(this, 'updateSpy'), false);
});

test('highlights as an error when error is truthy', function(assert) {
  set(this, 'testError', null);
  page.render(hbs`{{kinetic-form/radios error=testError update=(action updateSpy)}}`);
  assert.notOk(page.hasError, 'expected to not have error highlight');
  run(() => set(this, 'testError', {message: 'test-error'}));
  assert.ok(page.hasError, 'expected to have error highlight');
});
