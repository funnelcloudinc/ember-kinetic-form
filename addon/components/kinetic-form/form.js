import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/form';

const { Component, get } = Ember;

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
