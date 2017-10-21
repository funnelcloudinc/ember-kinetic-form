import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/string';

export default Ember.Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--string'],
  classNameBindings: ['error:has-error']
});
