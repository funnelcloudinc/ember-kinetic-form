import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/section';

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

    test('yields field.items', async function (assert) {
      set(this, 'testField', { title: 'test-title', items: ['1', '2', '3'] });
      await render(hbs`
      {{#semantic-ui-kinetic-form/section field=this.testField as |item|}}
        test-{{item}}
      {{/semantic-ui-kinetic-form/section}}
    `);
      assert.ok(page.contains('test-1'), 'expected item 1 to be yielded');
      assert.ok(page.contains('test-2'), 'expected item 2 to be yielded');
      assert.ok(page.contains('test-3'), 'expected item 3 to be yielded');
    });
  }
);
