import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/instructions';

export default Ember.Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--instructions']
});
