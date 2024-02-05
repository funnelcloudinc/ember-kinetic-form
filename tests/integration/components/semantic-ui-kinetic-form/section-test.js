import { set } from '@ember/object';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page, {
  pageWithSubSection,
} from '../../../pages/components/semantic-ui-kinetic-form/section';

module(
  'Integration | Component | semantic ui kinetic form/section',
  function (hooks) {
    setupRenderingTest(hooks);

    test('displays field.title', async function (assert) {
      set(this, 'testField', { title: 'test title' });
      await render(
        hbs`{{semantic-ui-kinetic-form/section field=this.testField}}`
      );
      assert.ok(
        page.hasInTitle('test title'),
        'expected field.title to be displayed'
      );
    });

    test('displays provides a linkable anchor', async function (assert) {
      set(this, 'testField', { title: 'test title' });
      await render(
        hbs`{{semantic-ui-kinetic-form/section field=this.testField}}`
      );
      assert.strictEqual(page.anchor, 'test-title');
    });

    test('displays section items', async function (assert) {
      set(this, 'testField', {
        title: 'test-title',
        items: [
          {
            key: '1',
            type: 'instructions',
            title: '1. Heat\n2. Pour',
            componentName: 'semantic-ui-kinetic-form/instructions',
          },
          {
            key: '2',
            type: 'passfail',
            title: 'To be or not',
            required: false,
            componentName: 'semantic-ui-kinetic-form/passfail',
          },
          {
            key: '3',
            type: 'boolean',
            title: 'Reality [] box',
            required: true,
            componentName: 'semantic-ui-kinetic-form/boolean',
          },
        ],
      });
      set(this, 'noop', function () {});
      await render(
        hbs`{{semantic-ui-kinetic-form/section field=this.testField update=this.noop updateAction=this.noop}}`
      );

      assert.ok(
        page.contains('1. Heat\n2. Pour'),
        'expected form element 1 to be rendered'
      );
      assert.ok(
        page.contains('To be or not'),
        'expected form element 2 to be rendered'
      );
      assert.ok(
        page.contains('Reality [] box'),
        'expected form element 3 to be rendered'
      );
    });

    test('displays sub-sections', async function (assert) {
      set(this, 'testField', {
        title: 'test-title',
        items: [
          {
            key: '1',
            type: 'instructions',
            title: '1. Heat\n2. Pour',
            componentName: 'semantic-ui-kinetic-form/instructions',
          },
          {
            type: 'section',
            title: 'sub-section',
            required: false,
            componentName: 'semantic-ui-kinetic-form/section',
            items: [
              {
                key: '2',
                type: 'passfail',
                title: 'To be or not',
                required: false,
                componentName: 'semantic-ui-kinetic-form/passfail',
              },
              {
                key: '3',
                type: 'boolean',
                title: 'Reality [] box',
                required: true,
                componentName: 'semantic-ui-kinetic-form/boolean',
              },
            ],
          },
        ],
      });
      set(this, 'noop', function () {});
      await render(
        hbs`<div id="test-parent">{{semantic-ui-kinetic-form/section field=this.testField update=this.noop updateAction=this.noop}}</div>`
      );

      assert.ok(
        pageWithSubSection.contains('1. Heat\n2. Pour'),
        'expected form element 1 to be rendered'
      );
      assert.ok(
        pageWithSubSection.contains('sub-section'),
        'expected sub-section title to be rendered'
      );
      assert.ok(
        pageWithSubSection.contains('To be or not'),
        'expected form element 2 to be rendered'
      );
      assert.ok(
        pageWithSubSection.contains('Reality [] box'),
        'expected form element 3 to be rendered'
      );
    });

    test('passes through the update action', async function (assert) {
      const updateActionSpy = sinon.spy();
      set(this, 'updateAction', updateActionSpy);
      set(this, 'noop', function () {});
      set(this, 'testField', {
        title: 'test-title',
        items: [
          {
            type: 'section',
            title: 'sub-section',
            required: false,
            componentName: 'semantic-ui-kinetic-form/section',
            items: [
              {
                key: '1',
                type: 'boolean',
                title: 'Is it complete',
                required: true,
                componentName: 'semantic-ui-kinetic-form/boolean',
              },
            ],
          },
        ],
      });

      await render(
        hbs`<div id="test-parent">{{semantic-ui-kinetic-form/section field=this.testField updateAction=this.updateAction update=this.noop}}</div>`
      );

      run(() => pageWithSubSection.booleanField.toggle());
      await settled();

      sinon.assert.calledWith(
        updateActionSpy,
        '1', // key
        true // value
      );
    });
  }
);
