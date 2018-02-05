import PageObject from 'ember-cli-page-object';

const { text, contains, hasClass } = PageObject;

export const KineticFormImage = {
  scope: '.kinetic-form--image',
  text: text('label'),
  hasInTitle: contains('label'),
  hasError: hasClass('has-error'),
};

export default PageObject.create(KineticFormImage);
