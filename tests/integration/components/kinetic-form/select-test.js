import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/select';
import sinon from 'sinon';

const { run, set, get } = Ember;

moduleForComponent('kinetic-form/select', 'Integration | Component | kinetic form/select', {
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
  page.render(hbs`{{kinetic-form/select field=testField update=(action updateSpy)}}`);
  assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
});

test('highlights as required when field.required is true', function(assert) {
  set(this, 'testField', {required: false});
  page.render(hbs`{{kinetic-form/select field=testField update=(action updateSpy)}}`);
  assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
  run(() => set(this, 'testField.required', true));
  assert.ok(page.isRequired, 'expected component to be highlighted as required');
});

test('shows the current value', function(assert) {
  set(this, 'testField', {options: ['foo', 'test-value', 'bar']});
  page.render(hbs`{{kinetic-form/select value="test-value" field=testField update=(action updateSpy)}}`);
  assert.equal(page.selectedValue, 'test-value');
});

test('calls update action when user enters text', function() {
  set(this, 'testField', {options: ['foo', 'test-text', 'bar']});
  page.render(hbs`{{kinetic-form/select field=testField update=(action updateSpy)}}`);
  run(() => page.select('test-text'));
  sinon.assert.calledWith(get(this, 'updateSpy'), 'test-text');
});

test('highlights as an error when error is truthy', function(assert) {
  set(this, 'testError', null);
  page.render(hbs`{{kinetic-form/select error=testError update=(action updateSpy)}}`);
  assert.notOk(page.hasError, 'expected to not have error highlight');
  run(() => set(this, 'testError', {message: 'test-error'}));
  assert.ok(page.hasError, 'expected to have error highlight');
});
