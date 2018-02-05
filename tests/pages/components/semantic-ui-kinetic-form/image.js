import PageObject from 'ember-cli-page-object';

const { text, contains } = PageObject;

export const SemanticUIKineticFormImage = {
  scope: '.semantic-ui-kinetic-form--image',
  title: text('label'),
  hasInTitle: contains('label'),
};

export default PageObject.create(SemanticUIKineticFormImage);
