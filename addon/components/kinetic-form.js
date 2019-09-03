import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';
import SchemaFormParser from '../-schema-form-parser';

const { Component, get, set, isNone, computed, A, RSVP, ObjectProxy, PromiseProxyMixin } = Ember;
const { resolve } = RSVP;
const { reads, alias } = computed;

const DEFAULT_COMPONENT_NAME_PROP = 'stringComponent';
const AUTOSAVE_DELAY = 15000;

const DefinitionDecorator = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  layout,
  classNames: ['kinetic-form'],

  showErrors: false,
  readOnly: false,
  _changes: [], // internally keep track of changeset changes

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
  hasPendingChanges: alias('onUpdateTask.isRunning'),

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
      let changeset = new Changeset(model, lookupValidator(validations), validations, { skipValidate: true });
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

  handleFormChanges({ key, value }) {
    let changeset = get(this, 'changeset');

    changeset.set(`${key}`, value);
    let changes = [...changeset.get('changes')]; // keep a copy of changes before force setting below (force setting `_content clobbers the changesets changes)
    this.set('_changes', changes); // keep track of changes at the class level so we can pass them back when submitting the form
    // changeset.set(`_content.${key}`, value); // force set changeset `_content` key (allows for saving invalid forms, ie, incomplete forms)

    return { changeset, changes };
  },

  validateAndNotifySubmitTask: task(function*({ changeset, changes }) {
    let isValid = yield this.validateForm();
    if (!isValid) return;
    return yield this.get('onSubmit')(changeset, changes, true);
  }),

  notifyUpdateTask: task(function*({ key, value }) {
    if (this.isDestroyed) return;
    if (this.get('readOnly')) return;

    let { changeset, changes } = this.handleFormChanges({ key, value });

    yield timeout(AUTOSAVE_DELAY);

    return yield this.get('onUpdateTask').perform({ changeset, changes });
  }).restartable(),

  submitTask: task(function*({ changeset, changes, validate }) {
    if (this.isDestroyed) return;
    if (this.get('readOnly')) return;

    this.get('notifyUpdateTask').cancelAll(); // cancel `notifyUpdateTask` when submitting the form

    if (validate) {
      return yield this.get('validateAndNotifySubmitTask').perform({ changeset, changes });
    } else {
      return yield this.get('onSubmitTask').perform({ changeset, changes, complete: false });
    }
  }),

  // Wrap `onUpdate` action in a task so we can use the tasks derived state to handle UI state
  onUpdateTask: task(function*({ changeset, changes }) {
    return yield get(this, 'onUpdate')(changeset, changes);
  }),

  // Wrap `onSubmit` action in a task so we can use the tasks derived state to handle UI state
  onSubmitTask: task(function*({ changeset, changes, complete }) {
    return yield this.get('onSubmit')(changeset, changes, complete);
  }),

  init() {
    this._super(...arguments);
    set(this, '_updatedFields', A());
  },

  actions: {
    updateProperty(key, value) {
      return this.get('notifyUpdateTask').perform({ key, value });
    },

    submit(validate = true) {
      let changeset = this.get('changeset');
      let changes = this.get('_changes');

      return this.get('submitTask').perform({ changeset, changes, validate });
    }
  }
});
