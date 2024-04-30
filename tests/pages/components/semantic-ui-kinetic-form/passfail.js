import PageObject from 'ember-cli-page-object';

const { text, contains, clickable, hasClass } = PageObject;

export const SemanticUIKineticFormPassFail = {
  scope: '.semantic-ui-kinetic-form--passfail',
  title: text('label'),
  hasInTitle: contains('label'),
  isPassed: hasClass('green', '.check'),
  isFailed: hasClass('red', '.close'),
  isDocStatusControl: hasClass('warning', ' > div'),
  hasError: hasClass('error', '.field'),
  setPassed: clickable('.check'),
  setFailed: clickable('.close'),
  isRequired: hasClass('required', '.field'),
};

export default PageObject.create(SemanticUIKineticFormPassFail);
