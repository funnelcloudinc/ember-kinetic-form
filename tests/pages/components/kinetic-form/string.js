import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const KineticFormString = {
  scope: '.kinetic-form--string',
  title: text('label'),
  value: value('input'),
  enterText: fillable('input'),
  hasInTitle: contains('label'),
  hasError: hasClass('has-error'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    },
  },
};

export default PageObject.create(KineticFormString);
