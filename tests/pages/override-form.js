import PageObject from 'ember-cli-page-object';

const { visitable, clickable, text } = PageObject;

export const OverrideForm = {
  visit: visitable('/override-form'),
  didValidationsResult: text('.on-submit-did-validations'),
  submit: clickable('button[type=submit]'),
  incompleteSubmit: clickable('button.inverted.red.button')
};

export default PageObject.create(OverrideForm);
