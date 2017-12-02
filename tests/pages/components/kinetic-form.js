import PageObject from 'ember-cli-page-object';
import { KineticFormErrors } from './kinetic-form/errors';
import { KineticFormForm } from './kinetic-form/form';
import { KineticFormBoolean } from './kinetic-form/boolean';
import { KineticFormNumber } from './kinetic-form/number';
import { KineticFormRadios } from './kinetic-form/radios';
import { KineticFormString } from './kinetic-form/string';
import { KineticFormTextarea } from './kinetic-form/textarea';

// Although this component allows multiple fields of the same type PageObject
// has difficulty disambiguating these based on using the components' page
// object definitions. Either disambiguate in tests by never using same types
// in a single test or create a new collection manually.
export const KinenticForm = {
  scope: '.kinetic-form',
  form: KineticFormForm,
  loading: {scope: '.kinetic-form--loading'},
  errorsSection: KineticFormErrors,
  booleanField: KineticFormBoolean,
  numberField: KineticFormNumber,
  radiosField: KineticFormRadios,
  stringField: KineticFormString,
  textareaField: KineticFormTextarea,
  submit() {
    return this.form.submitButton.click();
  }
};

export default PageObject.create(KinenticForm);

