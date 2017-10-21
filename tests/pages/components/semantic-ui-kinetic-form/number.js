import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const SemanticUIKineticFormNumber = {
  scope: '.semantic-ui-kinetic-form--number',
  title: text('label'),
  value: value('input'),
  enterText: fillable('input'),
  hasInTitle: contains('label'),
  hasError: hasClass('error', '.field'),
  isRequired: hasClass('required', '.field')
};

export default PageObject.create(SemanticUIKineticFormNumber);
