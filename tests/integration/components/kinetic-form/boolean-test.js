import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/boolean';
import sinon from 'sinon';

moduleForComponent('kinetic-form/boolean', 'Integration | Component | kinetic form/boolean', {
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
  this.render(hbs`{{kinetic-form/boolean field=testField update=(action updateSpy)}}`);
  assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
});

test('highlights as required when field.required is true', function(assert) {
  set(this, 'testField', {required: false});
  this.render(hbs`{{kinetic-form/boolean field=testField update=(action updateSpy)}}`);
  assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
  run(() => set(this, 'testField.required', true));
  assert.ok(page.isRequired, 'expected component to be highlighted as required');
});

test('shows the current value', function(assert) {
  this.render(hbs`{{kinetic-form/boolean value=true update=(action updateSpy)}}`);
  assert.ok(page.isChecked, 'expected checkbox to be checked');
});

test('calls update action when user enters text', function() {
  this.render(hbs`{{kinetic-form/boolean update=(action updateSpy)}}`);
  run(() => page.toggle());
  sinon.assert.calledWith(this.updateSpy, true);
});

test('highlights as an error when error is truthy', function(assert) {
  set(this, 'testError', null);
  this.render(hbs`{{kinetic-form/boolean error=testError update=(action updateSpy)}}`);
  assert.notOk(page.hasError, 'expected to not have error highlight');
  run(() => set(this, 'testError', {message: 'test-error'}));
  assert.ok(page.hasError, 'expected to have error highlight');
});
