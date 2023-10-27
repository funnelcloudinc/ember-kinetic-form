import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../templates/components/kinetic-form/boolean';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--boolean'],
  classNameBindings: ['error:has-error'],

  actions: {
    toggle() {
      get(this, 'update')(!get(this, 'value'));
    }
  }
});
