import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const SemanticUIKineticFormString = {
  scope: '.semantic-ui-kinetic-form--string',
  title: text('label'),
  value: value('input'),
  enterText: fillable('input'),
  hasInTitle: contains('label'),
  hasError: hasClass('error', '.field'),
  isRequired: hasClass('required', '.field'),
};

export default PageObject.create(SemanticUIKineticFormString);
