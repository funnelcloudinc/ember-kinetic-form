import Component from '@ember/component';
import layout from '../../templates/components/kinetic-form/number';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--number'],
  classNameBindings: ['error:has-error']
});
