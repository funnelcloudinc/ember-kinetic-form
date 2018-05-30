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
  isNone,
  run: { debounce },
  A,
  RSVP: { all, resolve },
  ObjectProxy,
  PromiseProxyMixin
} = Ember;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';
const DEFAULT_UPDATE_DEBOUNCE_DELAY = 700;

const DefinitionDecorator = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,
  updateDebounceDelay: DEFAULT_UPDATE_DEBOUNCE_DELAY,
  validateOnUpdate: false,

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

  validateForm(field) {
    let changeset = get(this, 'changeset');
    return changeset.validate(field).then(() => {
      set(this, 'showErrors', false);
      if (field && isNone(get(changeset, `error.${field}`))) { return true; }
      if (get(changeset, 'isValid')) { return true; }
      set(this, 'showErrors', true);
      return false;
    });
  },

  validateAndNotifySubmit() {
    return this.validateForm().then(isValid => {
      if (!isValid) { return; }
      get(this, 'onSubmit')(get(this, 'changeset'), true);
    });
  },

  validateAndNotifyUpdate() {
    let updatedFields = get(this, '_updatedFields');
    let validations = updatedFields.uniq().map(field => this.validateForm(field));
    updatedFields.clear();
    return all(validations).then(validationResults => {
      let isValid = validationResults.every(identity => identity);
      if (!isValid) { return; }
      return get(this, 'onUpdate')(get(this, 'changeset'), true);
    });
  },

  notifyUpdate() {
    get(this, 'onUpdate')(get(this, 'changeset'));
  },

  init() {
    this._super(...arguments);
    set(this, '_updatedFields', A());
  },

  actions: {
    updateProperty(key, value, validate = true) {
      set(this, `changeset.${key}`, value);
      if (!get(this, 'onUpdate')) { return; }
      if (!validate) {
        return get(this, 'onUpdate')(get(this, 'changeset'), false);
      }
      let delay = get(this, 'updateDebounceDelay');
      let validate = get(this, 'validateOnUpdate');
      if (validate) { 
        get(this, '_updatedFields').pushObject(key);
        debounce(this, this.validateAndNotifyUpdate, delay);
      } else {
        debounce(this, this.notifyUpdate, delay); 
      }
    },

    submit(validate = true) {
      if (validate) {
        return this.validateAndNotifySubmit();
      } else {
        return get(this, 'onSubmit')(get(this, 'changeset'), false);
      }
    }
  }
});
