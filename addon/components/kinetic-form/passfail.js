import Component from '@ember/component';
import layout from '../../templates/components/kinetic-form/passfail';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--passfail'],
  classNameBindings: ['error:has-error'],
});
