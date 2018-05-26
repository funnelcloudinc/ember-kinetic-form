import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/semantic-ui-kinetic-form/section';

const { set } = Ember;

moduleForComponent('semantic-ui-kinetic-form/section', 'Integration | Component | semantic ui kinetic form/section', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('displays field.title', function(assert) {
  set(this, 'testField', {title: 'test-title'});
  page.render(hbs`{{semantic-ui-kinetic-form/section field=testField}}`);
  assert.ok(page.hasInTitle('test-title'), 'expected field.title to be displayed');
});
