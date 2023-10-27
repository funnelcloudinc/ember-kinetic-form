import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../templates/components/kinetic-form/form';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['kinetic-form--form'],

  submit(evt) {
    evt.preventDefault();
    get(this, 'onSubmit')();
    return false;
  }
});
