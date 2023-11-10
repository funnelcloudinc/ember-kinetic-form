import PageObject from 'ember-cli-page-object';

const { text, value, fillable, contains, hasClass } = PageObject;

export const KineticFormTextarea = {
  scope: '.kinetic-form--textarea',
  title: text('label'),
  value: value('textarea'),
  enterText: fillable('textarea'),
  hasInTitle: contains('label'),
  hasError: hasClass('has-error'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    },
  },
};

export default PageObject.create(KineticFormTextarea);
