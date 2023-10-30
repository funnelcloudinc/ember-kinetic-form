import Component from '@ember/component';
import layout from '../../templates/components/kinetic-form/form';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['kinetic-form--form'],

  submit(evt) {
    evt.preventDefault();
    this.onSubmit();
    return false;
  }
});
