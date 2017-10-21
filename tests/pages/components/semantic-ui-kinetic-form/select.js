import PageObject from 'ember-cli-page-object';

const { text, clickOnText, contains, hasClass } = PageObject;

export const SemanticUIKineticFormSelect = {
  scope: '.semantic-ui-kinetic-form--select',
  title: text('label'),
  selectedValue: text('.menu .item.selected'),
  select: clickOnText('.menu .item'),
  hasInTitle: contains('label'),
  hasError: hasClass('error', '.field'),
  isRequired: hasClass('required', '.field')
};

export default PageObject.create(SemanticUIKineticFormSelect);
