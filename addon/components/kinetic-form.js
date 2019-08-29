import Ember from 'ember';
import { task } from 'ember-concurrency';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';
import SchemaFormParser from '../-schema-form-parser';

const { Component, get, set, isNone, computed, A, RSVP, ObjectProxy, PromiseProxyMixin, typeOf } = Ember;
const { all, resolve } = RSVP;
const { reads, alias } = computed;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';

const DefinitionDecorator = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,
  readOnly: false,

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
  sectionComponent: 'kinetic-form/section',

  properties: reads('schemaParser.elements'),

  isInvalid: alias('changeset.isInvalid'),
  hasPendingChanges: alias('notifyUpdateTask.isRunning'),

  validators: computed('properties.@each.required', {
    get() {
      let validators = {};
      let properties = get(this, 'properties');

      function buildValidators(items = []) {
        for (let item of items) {
          if (item.items) {
            buildValidators(item.items);
          }
          if (!item.key) {
            continue;
          }
          validators[item.key] = validatorsFor(item);
        }
      }

      buildValidators(properties);
      return validators;
    }
  }),

  changeset: computed('{model,validators}', {
    get() {
      let model = get(this, 'model');
      let validations = get(this, 'validators');
      let changeset = new Changeset(model, lookupValidator(validations), validations);
      return changeset;
    }
  }),

  decoratedDefinition: computed('definition', {
    get() {
      let promise = resolve(get(this, 'definition'));
      return DefinitionDecorator.create({ promise });
    }
  }),

  schemaParser: computed('decoratedDefinition.{schema,form}', {
    get() {
      const lookupComponentName = type => {
        return get(this, `${type}Component`) || get(this, DEFAULT_COMPONENT_NAME_PROP);
      };
      let schema = get(this, 'decoratedDefinition.schema') || {};
      let form = A(get(this, 'decoratedDefinition.form') || []);
      let existingSchemaParser = get(this, '_schemaParser');

      if (existingSchemaParser && !Object.keys(schema).length && !form.length) {
        return existingSchemaParser;
      }

      let schemaFormParser = SchemaFormParser.create({ schema, form, lookupComponentName });

      set(this, '_schemaParser', schemaFormParser);

      return schemaFormParser;
    }
  }),

  validateForm(field) {
    let changeset = get(this, 'changeset');
    return changeset.validate(field).then(() => {
      set(this, 'showErrors', false);
      if (field && isNone(get(changeset, `error.${field}`))) {
        return true;
      }
      if (get(changeset, 'isValid')) {
        return true;
      }
      set(this, 'showErrors', true);
      return false;
    });
  },

  validateAndNotifySubmit() {
    return this.validateForm().then(isValid => {
      if (!isValid) {
        return;
      }
      get(this, 'onSubmit')(get(this, 'changeset'), [], true);
    });
  },

  notifyUpdateTask: task(function*({ key, value }) {
    if (this.isDestroyed) return;
    let { changeset, changes } = this.handleFormChanges({ key, value });
    return yield get(this, 'onUpdate')(changeset, changes);
  }),

  handleFormChanges({ key, value }) {
    let changeset = get(this, 'changeset');

    set(changeset, `${key}`, value);

    let changes = [...get(changeset, 'changes')];

    // HACK: ember-changeset will not set a property that is not valid.
    set(changeset, `_content.${key}`, value);

    return { changeset, changes };
  },

  init() {
    this._super(...arguments);
    set(this, '_updatedFields', A());
  },

  actions: {
    updateProperty(key, value) {
      if (get(this, 'readOnly')) return;
      return this.get('notifyUpdateTask').perform({ key, value });
    },

    submit(validate = true) {
      if (get(this, 'readOnly')) return;
      if (validate) {
        return this.validateAndNotifySubmit();
      } else {
        return get(this, 'onSubmit')(get(this, 'changeset'), false);
      }
    }
  }
});
