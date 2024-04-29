import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/passfail';
import sinon from 'sinon';

const { run, set } = Ember;

moduleForComponent('semantic-ui-kinetic-form/passfail', 'Integration | Component | semantic ui kinetic form/passfail', {
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
  set(this, 'testField', { title: 'test-title' });
  page.render(
    hbs`{{semantic-ui-kinetic-form/passfail field=this.testField update=(action this.updateSpy)}}`
  );
  assert.ok(
    page.hasInTitle('test-title'),
    'expected field.title to be displayed'
  );
});

test('highlights as required when field.required is true', function(assert) {
  set(this, 'testField', { required: false });
  page.render(
    hbs`{{semantic-ui-kinetic-form/passfail field=this.testField update=(action this.updateSpy)}}`
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

test('calls update action when user clicks PASS', function() {
  page.render(
    hbs`{{semantic-ui-kinetic-form/passfail update=(action this.updateSpy)}}`
  );

  run(() => page.setPassed());
  sinon.assert.calledWith(this.updateSpy, true);
});

test('calls update action when user clicks FAIL', function() {
  page.render(
    hbs`{{semantic-ui-kinetic-form/passfail update=(action this.updateSpy)}}`
  );

  run(() => page.setFailed());
  sinon.assert.calledWith(this.updateSpy, false);
});

test('shows highlighting when it is a document status control', function(assert) {
  set(this, 'testField', { informs_document_status: false });
  page.render(
    hbs`{{semantic-ui-kinetic-form/passfail update=(action this.updateSpy) field=this.testField}}`
  );
  assert.notOk(
    page.isDocStatusControl,
    'starts without showing document status control formating'
  );

  run(() => set(this, 'testField.informs_document_status', true));
  assert.ok(
    page.isDocStatusControl,
    'shows document status control formating'
  );
});
