import Ember from 'ember';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';
import SchemaFormParser from '../-schema-form-parser';

const {
  Component,
  get,
  set,
  computed,
  run: { debounce },
  A,
  RSVP: { resolve },
  ObjectProxy,
  PromiseProxyMixin
} = Ember;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';
const DEFAULT_AUTO_SUBMIT_DELAY = 700;

const DefinitionDecorator = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,
  autoSubmit: true,
  autoSubmitDelay: DEFAULT_AUTO_SUBMIT_DELAY,

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

  schemaParser: computed('decoratedDefinition.{schema,form}', {
    get() {
      let schema = get(this, 'decoratedDefinition.schema') || {};
      let form = A(get(this, 'decoratedDefinition.form') || []);
      return SchemaFormParser.create({ schema, form });
    }
  }),

  properties: computed('schemaParser.elements.[]', {
    get() {
      let elements = get(this, 'schemaParser.elements');
      for (let element of elements) {
        element.componentName = get(this, `${element.type}Component`)
          || get(this, DEFAULT_COMPONENT_NAME_PROP);
      }
      return elements;
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
      if (!get(this, 'autoSubmit')) { return; }
      let delay = get(this, 'autoSubmitDelay');
      debounce(this, this.submitForm, delay);
    },

    submit() {
      this.submitForm();
    }
  }
});
