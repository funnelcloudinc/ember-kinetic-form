import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from '../../../pages/components/kinetic-form/section';

moduleForComponent('kinetic-form/section', 'Integration | Component | kinetic form/section', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('displays field.title', function(assert) {
  set(this, 'testField', {title: 'test title'});
  page.render(hbs`{{kinetic-form/section field=testField}}`);
  assert.ok(page.hasInTitle('test title'), 'expected field.title to be displayed');
});

test('displays provides a linkable anchor', function(assert) {
  set(this, 'testField', {title: 'test title'});
  page.render(hbs`{{kinetic-form/section field=testField}}`);
  assert.equal(page.anchor, 'test-title');
});

test('yields field.items', function(assert) {
  set(this, 'testField', {title: 'test-title', items: ['1', '2', '3']});
  page.render(hbs`
    {{#kinetic-form/section field=testField as |item|}}
      test-{{item}}
    {{/kinetic-form/section}}
  `);
  assert.ok(page.contains('test-1'), 'expected item 1 to be yielded');
  assert.ok(page.contains('test-2'), 'expected item 2 to be yielded');
  assert.ok(page.contains('test-3'), 'expected item 3 to be yielded');
});
