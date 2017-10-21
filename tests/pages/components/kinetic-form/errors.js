import PageObject from 'ember-cli-page-object';

const { collection } = PageObject;

export const KineticFormErrors = {
  scope: '.kinetic-form--errors',
  messages: collection({
    itemScope: '.kinetic-form--errors__message'
  })
};

export default PageObject.create(KineticFormErrors);
