import { A } from '@ember/array';
import EmberError from '@ember/error';
import { reads } from '@ember/object/computed';
import { /* deprecate, */ assert } from '@ember/debug';
import EmberObject, { computed } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';

function PropertiesUnaccountedForError(name) {
  EmberError.call(
    this,
    `Property '${name}' was not accounted for in the 'form' array.`
  );
}
PropertiesUnaccountedForError.prototype = Object.create(EmberError.prototype);

export function normalizeFormElement(
  element,
  properties,
  requiredKeys,
  lookup
) {
  let required = A(requiredKeys).includes(element.key);
  let property = Object.assign({}, properties[element.key]);
  let componentName = lookup(element.type || property.type);
  return Object.assign(property, element, { required, componentName });
}

export function* normalizeFormElements(form, properties, requiredKeys, lookup) {
  function* mapProperties(items) {
    for (let item of items) {
      // Identifies the non-base cases,
      // i.e. non-empty sections with items that still need to be processed
      if (item.items && item.items[0] && !item.items[0].componentName) {
        let recItems = [...mapProperties(item.items)];
        yield* mapProperties([Object.assign({}, item, { items: recItems })]);
      } else {
        let element = typeOf(item) === 'string' ? { key: item } : item;
        yield normalizeFormElement(element, properties, requiredKeys, lookup);
        if (element.key) {
          propertiesAccountedFor[element.key] = true;
        }
      }
    }
  }
  let propertiesAccountedFor = {};
  let propertyNames = Object.keys(properties);
  if (isEmpty(form)) {
    form = ['*'];
  }
  for (let item of form) {
    if (item === '*') {
      yield* mapProperties(propertyNames);
    } else if (item.items) {
      let items = [...mapProperties(item.items)];
      yield* mapProperties([Object.assign({}, item, { items })]);
    } else {
      yield* mapProperties([item]);
    }
  }
  for (let name of propertyNames) {
    if (!propertiesAccountedFor[name]) {
      throw new PropertiesUnaccountedForError(name);
    }
  }
}

export function* normalizeLegacyFormElements(
  form,
  properties,
  requiredKeys,
  lookup
) {
  // deprecate(
  //   `When using the 'form' array all properties need to be accounted for.`,
  //   false,
  //   { id: 'legacy-kinetic-form-use', until: '1.0.0' }
  // );
  let formOverrides = {};
  for (let override of form) {
    formOverrides[override.key] = override;
  }
  for (let key of Object.keys(properties)) {
    let element = formOverrides[key] || { key };
    yield normalizeFormElement(element, properties, requiredKeys, lookup);
  }
}

export default EmberObject.extend({
  type: reads('schema.type'),
  title: reads('schema.title'),
  required: reads('schema.required'),
  properties: reads('schema.properties'),

  elements: computed('{properties,form.[],required.[],lookupComponentName}', {
    get() {
      let form = this.form;
      let properties = this.properties;
      let requiredKeys = this.required || [];
      let lookup = this.lookupComponentName || function () {};
      try {
        return [
          ...normalizeFormElements(form, properties, requiredKeys, lookup),
        ];
      } catch (error) {
        if (!(error instanceof PropertiesUnaccountedForError)) {
          throw error;
        }
        return [
          ...normalizeLegacyFormElements(
            form,
            properties,
            requiredKeys,
            lookup
          ),
        ];
      }
    },
  }),

  init() {
    this._super(...arguments);
    let schemaType = this.type;
    assert(
      `${schemaType} in not a supported schema type`,
      schemaType === 'object'
    );
    assert('schema have a properties object', this.properties);
  },
});
