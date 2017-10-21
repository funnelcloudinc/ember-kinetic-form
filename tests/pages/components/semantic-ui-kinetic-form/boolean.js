import PageObject from 'ember-cli-page-object';

const { text, contains, clickable, hasClass } = PageObject;

export const SemanticUIKineticFormBoolean = {
  scope: '.semantic-ui-kinetic-form--boolean',
  title: text('label'),
  hasInTitle: contains('label'),
  isChecked: hasClass('green', 'button'),
  hasError: hasClass('error', '.field'),
  toggle: clickable('button'),
  isRequired: hasClass('required', '.field')
};

export default PageObject.create(SemanticUIKineticFormBoolean);
