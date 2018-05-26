import PageObject from 'ember-cli-page-object';

const { text, contains } = PageObject;

export const KineticFormSection = {
  scope: '.semantic-ui-kinetic-form--section',
  title: text(),
  hasInTitle: contains()
};

export default PageObject.create(KineticFormSection);
