import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/image';

const { Component, get } = Ember;

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--image'],
  classNameBindings: ['error:has-error']
});
