import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/radios';

const { Component, computed: { not } } = Ember;

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--radios'],
  classNameBindings: ['error:has-error'],

  onLabel: 'ON',
  offLabel: 'OFF',

  notValue: not('value')
});
