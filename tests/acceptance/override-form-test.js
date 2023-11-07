import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import page from '../../tests/pages/override-form';

module('Acceptance | override form', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking submit button submits with a false validated flag', async function(assert) {
    await page.visit().submit();
    assert.equal(page.didValidationsResult, 'true');
  });

  test('clicking incomplete button submits with a false validated flag', async function(assert) {
    await page.visit().incompleteSubmit();
    assert.equal(page.didValidationsResult, 'false');
  });
});
