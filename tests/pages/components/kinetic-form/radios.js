import PageObject from 'ember-cli-page-object';

const { text, contains, is, clickable, hasClass } = PageObject;

export const KineticFormRadios = {
  scope: '.kinetic-form--radios',
  title: text('.kinetic-form--radios__title'),
  hasInTitle: contains('.kinetic-form--radios__title'),
  hasError: hasClass('has-error'),
  isOn: is(':checked', '.kinetic-form--radios__on'),
  isOff: is(':checked', '.kinetic-form--radios__off'),
  turnOn: clickable('.kinetic-form--radios__on'),
  turnOff: clickable('.kinetic-form--radios__off'),
  isRequired: {
    isDescriptor: true,
    get() {
      return this.hasInTitle('*');
    }
  }
};

export default PageObject.create(KineticFormRadios);
