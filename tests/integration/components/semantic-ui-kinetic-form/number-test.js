import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/number';
import sinon from 'sinon';

const { run, set, get } = Ember;

moduleForComponent('semantic-ui-kinetic-form/number', 'Integration | Component | semantic ui kinetic form/number', {
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
  page.render(hbs`{{semantic-ui-kinetic-form/number field=testField update=(action updateSpy)}}`);
  assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
});

test('highlights as required when field.required is true', function(assert) {
  set(this, 'testField', {required: false});
  page.render(hbs`{{semantic-ui-kinetic-form/number field=testField update=(action updateSpy)}}`);
  assert.notOk(page.isRequired, 'expected component to not be highlighted as required');
  run(() => set(this, 'testField.required', true));
  assert.ok(page.isRequired, 'expected component to be highlighted as required');
});

test('shows the current value', function(assert) {
  page.render(hbs`{{semantic-ui-kinetic-form/number value=123 update=(action updateSpy)}}`);
  assert.equal(page.value, '123');
});

test('calls update action when user enters text', function() {
  page.render(hbs`{{semantic-ui-kinetic-form/number update=(action updateSpy)}}`);
  run(() => page.enterText('456'));
  sinon.assert.calledWith(get(this, 'updateSpy'), '456');
});

test('highlights as an error when error is truthy', function(assert) {
  set(this, 'testError', null);
  page.render(hbs`{{semantic-ui-kinetic-form/number error=testError update=(action updateSpy)}}`);
  assert.notOk(page.hasError, 'expected to not have error highlight');
  run(() => set(this, 'testError', {message: 'test-error'}));
  assert.ok(page.hasError, 'expected to have error highlight');
});
