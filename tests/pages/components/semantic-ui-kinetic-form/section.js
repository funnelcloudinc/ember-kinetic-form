import PageObject from 'ember-cli-page-object';
import { SemanticUIKineticFormBoolean } from './boolean';

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
  hasInTitle: contains('header'),
  booleanField: SemanticUIKineticFormBoolean,
};
const pageWithSubSection = PageObject.create(KineticFormWithSubSection);

export default PageObject.create(KineticFormSection);
export { pageWithSubSection };
