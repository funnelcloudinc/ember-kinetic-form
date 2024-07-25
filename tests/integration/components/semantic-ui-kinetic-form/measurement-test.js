import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/measurement';
import sinon from 'sinon';

module(
  'Integration | Component | semantic ui kinetic form/measurement',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      set(this, 'updateSpy', sinon.spy());
    });

    test('displays field.title', async function (assert) {
      set(this, 'testField', { title: 'test-title' });
      await render(
        hbs`{{semantic-ui-kinetic-form/measurement field=this.testField update=(action this.updateSpy)}}`
      );
      assert.ok(
        page.hasInTitle('test-title'),
        'expected field.title to be displayed'
      );
    });

    test('highlights as required when field.required is true', async function (assert) {
      set(this, 'testField', { required: false });
      await render(
        hbs`{{semantic-ui-kinetic-form/measurement field=this.testField update=(action this.updateSpy)}}`
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

    test('calls update action when user enters text', async function () {
      set(this, 'testField', {
        lower_control_limit: 10,
        upper_control_limit: 20,
      });
      await render(
        hbs`{{semantic-ui-kinetic-form/measurement field=this.testField update=(action this.updateSpy)}}`
      );
      await page.enterText('456');
      sinon.assert.calledWith(this.updateSpy, 456);
    });

    test('shows highlighting when it is a document status control', async function (assert) {
      set(this, 'testField', { informs_document_status: false });
      await render(
        hbs`{{semantic-ui-kinetic-form/measurement update=(action this.updateSpy) field=this.testField}}`
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
  }
);
