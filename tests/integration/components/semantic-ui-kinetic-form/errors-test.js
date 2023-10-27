import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/errors';

moduleForComponent('semantic-ui-kinetic-form/errors', 'Integration | Component | semantic ui kinetic form/errors', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('displays a list of errors', function(assert) {
  set(this, 'testErrors', ['test1', 'test2']);
  page.render(hbs`{{semantic-ui-kinetic-form/errors errors=testErrors}}`);
  assert.equal(page.messages(0).text, 'test1');
  assert.equal(page.messages(1).text, 'test2');
});
