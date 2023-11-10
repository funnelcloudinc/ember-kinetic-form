import Component from '@ember/component';
import layout from '../../templates/components/kinetic-form/textarea';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--textarea'],
  classNameBindings: ['error:has-error'],
});
