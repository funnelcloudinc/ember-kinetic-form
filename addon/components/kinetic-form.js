import Ember from 'ember';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';

const {
  Component, get, set, computed, assign, A
} = Ember;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,

  errorComponent: 'kinetic-form/errors',
  formComponent: 'kinetic-form/form',
  stringComponent: 'kinetic-form/string',
  numberComponent: 'kinetic-form/number',
  integerComponent: 'kinetic-form/number',
  booleanComponent: 'kinetic-form/boolean',
  radiosComponent: 'kinetic-form/radios',
  textareaComponent: 'kinetic-form/textarea',

  validators: computed('properties.@each.required', {
    get() {
      let validators = {};
      let properties = get(this, 'properties');
      for (let property of properties) {
        validators[property.key] = validatorsFor(property);
      }
      return validators;
    }
  }),

  changeset: computed('{model,validators}', {
    get() {
      let model = get(this, 'model');
      let validations = get(this, 'validators');
      let changeset = new Changeset(model, lookupValidator(validations), validations);
      this.initChangesetInvalidState(changeset);
      return changeset;
    }
  }),

  properties: computed('definition.{schema,form}', {
    get() {
      let schema = get(this, 'definition.schema') || {};
      let form = A(get(this, 'definition.form') || []);
      let required = A(get(schema, 'required') || []);
      let properties = get(schema, 'properties') || {};

      return Object.keys(properties).map(key => {
        let property = assign({}, properties[key]);

        // form property allows for overriding rendering defaults for a given
        // field type
        let formType = form.findBy('key', key);
        let propertyType = formType ?
          get(formType, 'type') :
          get(schema, `properties.${key}.type`);
        let componentName = get(this, `${propertyType}Component`);
        if (!componentName) {
          componentName = get(this, DEFAULT_COMPONENT_NAME_PROP);
        }

        property.key = key;
        property.required = required.includes(key);
        property.type = propertyType;
        property.componentName = componentName;
        return property;
      });
    }
  }),

  initChangesetInvalidState(changeset) {
    return changeset.validate()
      .catch(() => { /* Ignore rejection */ });
  },

  validateForm() {
    let changeset = get(this, 'changeset');
    return changeset.validate()
      .then(() => set(this, 'showErrors', false))
      .then(() => changeset)
      .catch(() => set(this, 'showErrors', true));
  },

  actions: {
    updateProperty(key, value) {
      set(this, `changeset.${key}`, value);
    },

    submit() {
      let changeset = get(this, 'changeset');
      this.validateForm(changeset).then(() => {
        if (get(changeset, 'isInvalid')) {
          set(this, 'showErrors', true);
          return;
        }
        set(this, 'showErrors', false);
        get(this, 'onSubmit')(changeset);
      });
    }
  }
});
