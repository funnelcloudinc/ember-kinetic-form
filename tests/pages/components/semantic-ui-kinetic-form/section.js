import PageObject from 'ember-cli-page-object';

const { attribute, contains, text } = PageObject;

export const KineticFormSection = {
  scope: '.semantic-ui-kinetic-form--section',
  anchor: attribute('id', '.header'),
  title: text('.header'),
  hasInTitle: contains('.header')
};

const KineticFormWithSubSection = {
  scope: '#test-parent > .semantic-ui-kinetic-form--section',
  anchor: attribute('id', '.header'),
  title: text('header'),
  hasInTitle: contains('header')
};
const pageWithSubSection = PageObject.create(KineticFormWithSubSection);

export default PageObject.create(KineticFormSection);
export { pageWithSubSection };
