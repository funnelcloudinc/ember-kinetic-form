import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const SemanticUIKineticFormMeasurement = {
  scope: '.semantic-ui-kinetic-form--measurement',
  title: text('label'),
  value: value('input'),
  enterText: fillable('input'),
  hasInTitle: contains('label'),
  isDocStatusControl: hasClass('warning', ' > div'),
  hasError: hasClass('error', '.field'),
  isRequired: hasClass('required', '.field'),
};

export default PageObject.create(SemanticUIKineticFormMeasurement);
