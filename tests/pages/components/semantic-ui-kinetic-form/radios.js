import PageObject from 'ember-cli-page-object';

const { text, contains, clickable, hasClass } = PageObject;

export const SemanticUIKineticFormRadios = {
  scope: '.semantic-ui-kinetic-form--radios',
  title: text('label'),
  hasInTitle: contains('label'),
  hasError: hasClass('error', '.field'),
  isOn: hasClass('active', 'button.red'),
  isOff: hasClass('active', 'button.green'),
  turnOn: clickable('button.red'),
  turnOff: clickable('button.green'),
  isRequired: hasClass('required', '.field'),
};

export default PageObject.create(SemanticUIKineticFormRadios);
