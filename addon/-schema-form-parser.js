import Ember from 'ember';

const {
  A,
  Error: EmberError,
  Object: EmberObject,
  assert,
  assign,
  computed,
  computed: { reads },
  deprecate,
  isEmpty,
  get,
  typeOf
} = Ember;

function PropertiesUnaccountedForError(name) {
  EmberError.call(this, `Property '${name}' was not accounted for in the 'form' array.`);
}
PropertiesUnaccountedForError.prototype = Object.create(EmberError.prototype);

export function normalizeFormElement(element, properties, requiredKeys, lookup) {
  let required = A(requiredKeys).includes(element.key);
  let property = assign({}, properties[element.key]);
  let componentName = lookup(element.type || property.type);
  return assign(property, element, { required, componentName });
}

export function* normalizeFormElements(form, properties, requiredKeys, lookup) {
  function* mapProperties(items) {
    for (let item of items) {
      let element = typeOf(item) === 'string' ? { key: item } : item;
      yield normalizeFormElement(element, properties, requiredKeys, lookup);
      if (element.key) { propertiesAccountedFor[element.key] = true; }
    }
  }
  let propertiesAccountedFor = {};
  let propertyNames = Object.keys(properties);
  if (isEmpty(form)) { form = ['*']; }
  for (let item of form) {
    if (item === '*') {
      yield* mapProperties(propertyNames);
    } else if (item.items) {
      let items = [...mapProperties(item.items)];
      yield* mapProperties([assign({}, item, {items})]);
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

export function* normalizeLegacyFormElements(form, properties, requiredKeys, lookup) {
  deprecate(
    `When using the 'form' array all properties need to be accounted for.`,
    false,
    { id: 'legacy-kinetic-form-use', until: '1.0.0' }
  );
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

  elements: computed('{properties,form.[],required.[]}', {
    get() {
      let form = get(this, 'form');
      let properties = get(this, 'properties');
      let requiredKeys = get(this, 'required') || [];
      let lookup = get(this, 'lookupComponentName') || function() {};
      try {
        return [...normalizeFormElements(form, properties, requiredKeys, lookup)];
      } catch (error) {
        if (!(error instanceof PropertiesUnaccountedForError)) { throw error; }
        return [...normalizeLegacyFormElements(form, properties, requiredKeys, lookup)];
      }
    }
  }),

  init() {
    this._super(...arguments);
    let schemaType = get(this, 'type');
    assert(`${schemaType} in not a supported schema type`, schemaType === 'object');
    assert('schema have a properties object', get(this, 'properties'));
  }
});
