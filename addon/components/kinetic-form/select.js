import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/select';

const {
  ArrayProxy,
  Component,
  computed,
  get,
  isBlank,
  isEqual
} = Ember;

const OptionsList = ArrayProxy.extend({
  objectAtContent(index) {
    let selectedValue = get(this, 'selectedValue');
    let value = get(this, 'content')[index];
    return {
      value,
      selected: isEqual(value, selectedValue)
    };
  }
});

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--select'],
  classNameBindings: ['error:has-error'],

  hasNoValue: computed('value', {
    get() {
      return isBlank(get(this, 'value'));
    }
  }),

  showPrompt: computed('{hasNoValue,field.required}', {
    get() {
      return !get(this, 'field.required') || get(this, 'hasNoValue');
    }
  }),

  options: computed('field.options.[]', {
    get() {
      let selectedValue = get(this, 'value');
      let content = get(this, 'field.options') || [];
      return OptionsList.create({content, selectedValue});
    }
  })
});
