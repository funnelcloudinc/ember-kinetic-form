import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page, {
  pageWithSubSection,
} from '../../../pages/components/kinetic-form/section';

module('Integration | Component | kinetic form/section', function (hooks) {
  setupRenderingTest(hooks);

  test('displays field.title', async function (assert) {
    set(this, 'testField', { title: 'test title' });
    await render(hbs`{{kinetic-form/section field=this.testField}}`);
    assert.ok(
      page.hasInTitle('test title'),
      'expected field.title to be displayed'
    );
  });

  test('displays provides a linkable anchor', async function (assert) {
    set(this, 'testField', { title: 'test title' });
    await render(hbs`{{kinetic-form/section field=this.testField}}`);
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
      hbs`{{kinetic-form/section field=this.testField update=this.noop}}`
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
          componentName: 'kinetic-form/section',
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
      hbs`<div id="test-parent">{{kinetic-form/section field=this.testField update=this.noop}}</div>`
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
});
