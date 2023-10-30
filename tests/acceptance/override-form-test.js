import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import page from '../../tests/pages/override-form';

moduleForAcceptance('Acceptance | override form');

test('clicking submit button submits with a false validated flag', async function(assert) {
  page.visit().submit();
  await assert.equal(page.didValidationsResult, 'true');
});

test('clicking incomplete button submits with a false validated flag', async function(assert) {
  page.visit().incompleteSubmit();
  await assert.equal(page.didValidationsResult, 'false');
});
