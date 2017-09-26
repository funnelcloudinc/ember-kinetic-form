import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/number';

export default Ember.Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--number'],
  classNameBindings: ['error:has-error']
});
