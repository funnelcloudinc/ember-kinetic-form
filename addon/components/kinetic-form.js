import { alias, reads } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { A } from '@ember/array';
import { resolve } from 'rsvp';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { task } from 'ember-concurrency';
import layout from '../templates/components/kinetic-form';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validatorsFor from '../-validators-for';
import SchemaFormParser from '../-schema-form-parser';

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
  sectionComponent: 'kinetic-form/section',
  passfailComponent: 'kinetic-form/passfail',
  instructionsComponent: 'kinetic-form/instructions',
  multiplechoiceComponent: 'kinetic-form/multiplechoice',

  properties: reads('schemaParser.elements'),

  isInvalid: alias('changeset.isInvalid'),

  validators: computed('properties.@each.required', {
    get() {
      let validators = {};
      let properties = this.properties;

      function buildValidators(items = []) {
        for (let item of items) {
          if (item.items) {
            buildValidators(item.items);
          }
          if (!item.key) {
            continue;
          }
          const validator = validatorsFor(item);
          if (validator) {
            validators[item.key] = validator;
          }
        }
      }

      buildValidators(properties);
      return validators;
    },
  }),

  changeset: computed('{model,validators,changesetOverride}', {
    get() {
      if (this.changesetOverride) return this.changesetOverride;

      let model = this.model;
      let validations = this.validators;
      let changeset = new Changeset(
        model,
        lookupValidator(validations),
        validations,
        { skipValidate: true }
      );
      return changeset;
    },
  }),

  decoratedDefinition: computed('definition', {
    get() {
      let promise = resolve(this.definition);
      return DefinitionDecorator.create({ promise });
    },
  }),

  schemaParser: computed(
    '{decoratedDefinition.schema,decoratedDefinition.form,_schemaParser}',
    {
      get() {
        const lookupComponentName = (type) => {
          return (
            get(this, `${type}Component`) ||
            get(this, DEFAULT_COMPONENT_NAME_PROP)
          );
        };
        let schema = this.decoratedDefinition.get('schema') || {};
        let form = A(this.decoratedDefinition.get('form') || []);
        let existingSchemaParser = this._schemaParser;

        if (
          existingSchemaParser &&
          !Object.keys(schema).length &&
          !form.length
        ) {
          return existingSchemaParser;
        }

        let schemaFormParser = SchemaFormParser.create({
          schema,
          form,
          lookupComponentName,
        });

        // eslint-disable-next-line ember/no-side-effects
        set(this, '_schemaParser', schemaFormParser);

        return schemaFormParser;
      },
    }
  ),

  validateForm() {
    let changeset = this.changeset;
    return changeset.validate().then(() => {
      set(this, 'showErrors', false);
      if (changeset.isValid) {
        return true;
      }
      set(this, 'showErrors', true);
      return false;
    });
  },

  handleFormChanges({ key, value }) {
    let changeset = this.changeset;
    changeset.set(`${key}`, value);
    return { changeset };
  },

  submitTask: task(function* ({ changeset, validate }) {
    if (validate) {
      let isValid = yield this.validateForm();
      if (!isValid) return;
      return yield this.onSubmitTask.perform({ changeset, complete: true });
    } else {
      return yield this.onSubmitTask.perform({ changeset, complete: false });
    }
  }),

  // Wrap `onSubmit` action in a task so we can use the tasks derived state to handle UI state
  onSubmitTask: task(function* ({ changeset, complete }) {
    return yield this.onSubmit(changeset, complete);
  }),

  init() {
    this._super(...arguments);
    set(this, '_updatedFields', A());
  },

  actions: {
    updateProperty(key, value) {
      if (this.readOnly) return;
      let { changeset } = this.handleFormChanges({ key, value });
      return this.onUpdate(changeset);
    },

    submit(validate = true) {
      if (this.readOnly) return;
      let changeset = this.changeset;
      return this.submitTask.perform({ changeset, validate });
    },
  },
});
