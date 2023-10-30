import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/errors';

module('Integration | Component | semantic ui kinetic form/errors', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    page.setContext(this);
  });

  hooks.afterEach(function() {
    page.removeContext();
  });

  test('displays a list of errors', async function(assert) {
    set(this, 'testErrors', ['test1', 'test2']);
    await render(hbs`{{semantic-ui-kinetic-form/errors errors=testErrors}}`);
    assert.equal(page.messages(0).text, 'test1');
    assert.equal(page.messages(1).text, 'test2');
  });
});
