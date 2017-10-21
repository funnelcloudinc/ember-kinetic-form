import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/boolean';

const { Component, get } = Ember;

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
