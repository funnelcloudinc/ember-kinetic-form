import PageObject from 'ember-cli-page-object';
import { SemanticUIKineticFormErrors } from './semantic-ui-kinetic-form/errors';
import { SemanticUIKineticFormForm } from './semantic-ui-kinetic-form/form';
import { SemanticUIKineticFormBoolean } from './semantic-ui-kinetic-form/boolean';
import { SemanticUIKineticFormNumber } from './semantic-ui-kinetic-form/number';
import { SemanticUIKineticFormRadios } from './semantic-ui-kinetic-form/radios';
import { SemanticUIKineticFormString } from './semantic-ui-kinetic-form/string';
import { SemanticUIKineticFormTextarea } from './semantic-ui-kinetic-form/textarea';

// Although this component allows multiple fields of the same type PageObject
// has difficulty disambiguating these based on using the components' page
// object definitions. Either disambiguate in tests by never using same types
// in a single test or create a new collection manually.
export const KinenticForm = {
  scope: '.semantic-ui-kinetic-form',
  form: SemanticUIKineticFormForm,
  loading: { scope: '.semantic-ui-kinetic-form--loading' },
  errorsSection: SemanticUIKineticFormErrors,
  booleanField: SemanticUIKineticFormBoolean,
  numberField: SemanticUIKineticFormNumber,
  radiosField: SemanticUIKineticFormRadios,
  stringField: SemanticUIKineticFormString,
  textareaField: SemanticUIKineticFormTextarea,
  submit() {
    return this.form.submitButton.click();
  },
};

export default PageObject.create(KinenticForm);
