import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const KineticFormNumber = {
  scope: '.kinetic-form--number',
  title: text('label'),
  value: value('input'),
  enterText: fillable('input'),
  hasInTitle: contains('label'),
  hasError: hasClass('has-error'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    }
  }
};

export default PageObject.create(KineticFormNumber);
