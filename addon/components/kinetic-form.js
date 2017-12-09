import Ember from 'ember';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';

const {
  Component,
  get,
  set,
  computed,
  assign,
  A,
  RSVP: { resolve },
  ObjectProxy,
  PromiseProxyMixin
} = Ember;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';

const DefinitionDecorator = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,

  loadingComponent: 'kinetic-form/loading',
  errorComponent: 'kinetic-form/errors',
  formComponent: 'kinetic-form/form',
  stringComponent: 'kinetic-form/string',
  numberComponent: 'kinetic-form/number',
  integerComponent: 'kinetic-form/number',
  booleanComponent: 'kinetic-form/boolean',
  radiosComponent: 'kinetic-form/radios',
  textareaComponent: 'kinetic-form/textarea',
  selectComponent: 'kinetic-form/select',

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

  decoratedDefinition: computed('definition', {
    get() {
      let promise = resolve(get(this, 'definition'));
      return DefinitionDecorator.create({promise});
    }
  }),

  properties: computed('decoratedDefinition.{schema,form}', {
    get() {
      let schema = get(this, 'decoratedDefinition.schema') || {};
      let form = A(get(this, 'decoratedDefinition.form') || []);
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

  submitForm() {
    let changeset = get(this, 'changeset');
    this.validateForm(changeset).then(() => {
      if (get(changeset, 'isInvalid')) {
        set(this, 'showErrors', true);
        return;
      }
      set(this, 'showErrors', false);
      get(this, 'onSubmit')(changeset);
    });
  },

  actions: {
    updateProperty(key, value) {
      set(this, `changeset.${key}`, value);
    },

    submit() {
      this.submitForm();
    }
  }
});
