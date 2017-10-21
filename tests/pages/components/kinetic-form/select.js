import PageObject from 'ember-cli-page-object';

const { text, value, selectable, contains, hasClass } = PageObject;

export const KineticFormSelect = {
  scope: '.kinetic-form--select',
  title: text('label'),
  selectedValue: value('option:selected'),
  select: selectable('option'),
  hasInTitle: contains('label'),
  hasError: hasClass('has-error'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    }
  }
};

export default PageObject.create(KineticFormSelect);
