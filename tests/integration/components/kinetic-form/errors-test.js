import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/errors';

module('Integration | Component | kinetic form/errors', function (hooks) {
  setupRenderingTest(hooks);

  test('displays a list of errors', async function (assert) {
    set(this, 'testErrors', [{ validation: 'test1' }, { validation: 'test2' }]);
    await render(hbs`{{kinetic-form/errors errors=this.testErrors}}`);
    assert.strictEqual(page.messages(0).text, 'test1');
    assert.strictEqual(page.messages(1).text, 'test2');
  });
});
