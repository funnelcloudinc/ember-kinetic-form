import PageObject from 'ember-cli-page-object';

const { text, is } = PageObject;

export const SemanticUIKineticFormForm = {
  scope: '.semantic-ui-kinetic-form--form',
  title: text('.header'),
  submitButton: {
    scope: 'button[type=submit]',
    isEnabled: is(':enabled'),
    isDisabled: is(':disabled')
  }
};

export default PageObject.create(SemanticUIKineticFormForm);
