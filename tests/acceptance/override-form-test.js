import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import page from '../../tests/pages/override-form';

moduleForAcceptance('Acceptance | override form');

test('clicking submit button submits with a false validated flag', function(assert) {
  page.visit().submit();
  andThen(function() {
    assert.equal(page.didValidationsResult, 'true');
  });
});

test('clicking incomplete button submits with a false validated flag', function(assert) {
  page.visit().incompleteSubmit();
  andThen(function() {
    assert.equal(page.didValidationsResult, 'false');
  });
});
