import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/textarea';

export default Ember.Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--textarea'],
  classNameBindings: ['error:has-error']
});
