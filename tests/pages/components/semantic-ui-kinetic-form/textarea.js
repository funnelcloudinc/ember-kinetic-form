import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const SemanticUIKineticFormTextarea = {
  scope: '.semantic-ui-kinetic-form--textarea',
  title: text('label'),
  value: value('textarea'),
  enterText: fillable('textarea'),
  hasInTitle: contains('label'),
  hasError: hasClass('error', '.field'),
  isRequired: hasClass('required', '.field')
};

export default PageObject.create(SemanticUIKineticFormTextarea);
