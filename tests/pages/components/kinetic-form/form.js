import PageObject from 'ember-cli-page-object';
import { getter } from 'ember-cli-page-object/macros';

const { text, property } = PageObject;

export const KineticFormForm = {
  scope: '.kinetic-form--form',
  title: text('h1'),
  submitButton: {
    scope: 'button[type=submit]',
    isDisabled: property('disabled'),
    isEnabled: getter(function () {
      return !this.isDisabled;
    }),
  },
};

export default PageObject.create(KineticFormForm);
