import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/passfail';

export default Ember.Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--passfail'],
  classNameBindings: ['error:has-error'],
});
