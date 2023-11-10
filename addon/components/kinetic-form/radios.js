import Component from '@ember/component';
import { not } from '@ember/object/computed';
import layout from '../../templates/components/kinetic-form/radios';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--radios'],
  classNameBindings: ['error:has-error'],

  onLabel: 'ON',
  offLabel: 'OFF',

  notValue: not('value'),
});
