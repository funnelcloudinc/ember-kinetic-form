import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/errors';

moduleForComponent('kinetic-form/errors', 'Integration | Component | kinetic form/errors', {
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
  this.render(hbs`{{kinetic-form/errors errors=testErrors}}`);
  assert.equal(page.messages(0).text, 'test1');
  assert.equal(page.messages(1).text, 'test2');
});
