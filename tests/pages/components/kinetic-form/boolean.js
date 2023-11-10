import PageObject from 'ember-cli-page-object';

const { text, contains, property, clickable, hasClass } = PageObject;

export const KineticFormBoolean = {
  scope: '.kinetic-form--boolean',
  text: text('label'),
  hasInTitle: contains('label'),
  isChecked: property('checked', 'input[type=checkbox]'),
  hasError: hasClass('has-error'),
  toggle: clickable('input[type=checkbox]'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    },
  },
};

export default PageObject.create(KineticFormBoolean);
