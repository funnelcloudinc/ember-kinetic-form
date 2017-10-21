import PageObject from 'ember-cli-page-object';

const { text, is } = PageObject;

export const KineticFormForm = {
  scope: '.kinetic-form--form',
  title: text('h1'),
  submitButton: {
    scope: 'button[type=submit]',
    isEnabled: is(':enabled'),
    isDisabled: is(':disabled')
  }
};

export default PageObject.create(KineticFormForm);
