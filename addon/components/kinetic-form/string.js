import Component from '@ember/component';
import layout from '../../templates/components/kinetic-form/string';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--string'],
  classNameBindings: ['error:has-error']
});
