import Ember from 'ember';

const {
  A,
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

export function normalizeFormElement(element, properties, requiredKeys = []) {
  let required = A(requiredKeys).includes(element.key);
  let property = assign({}, properties[element.key]);
  return assign(property, element, { required });
}

export function* normalizeFormElements(form, properties, requiredKeys) {
  let propertyNames = Object.keys(properties);
  if (isEmpty(form)) { form = ['*']; }
  for (let item of form) {
    if (item === '*') {
      yield* propertyNames
        .map(key => normalizeFormElement({ key }, properties, requiredKeys));
    } else {
      let element = typeOf(item) === 'string' ? { key: item } : item;
      yield normalizeFormElement(element, properties, requiredKeys);
    }
  }
}

export function* normalizeLegacyFormElements(form, properties, requiredKeys) {
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
    yield normalizeFormElement(element, properties, requiredKeys);
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
      let requiredKeys = get(this, 'required');
      let elements = [...normalizeFormElements(form, properties, requiredKeys)];
      return elements.length < Object.keys(properties).length
        ? [...normalizeLegacyFormElements(form, properties, requiredKeys)]
        : elements;
    }
  }),

  init() {
    this._super(...arguments);
    let schemaType = get(this, 'type');
    assert(`${schemaType} in not a supported schema type`, schemaType === 'object');
    assert('schema have a properties object', get(this, 'properties'));
  }
});
