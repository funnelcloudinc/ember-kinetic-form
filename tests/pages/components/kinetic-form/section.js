import PageObject from 'ember-cli-page-object';

const { attribute, contains, text } = PageObject;

export const KineticFormSection = {
  scope: '.kinetic-form--section',
  anchor: attribute('id', 'h2'),
  title: text('h2'),
  hasInTitle: contains('h2'),
};

export default PageObject.create(KineticFormSection);
