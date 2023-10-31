import ArrayProxy from '@ember/array/proxy';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual, isBlank } from '@ember/utils';
import layout from '../../templates/components/kinetic-form/select';

const OptionsList = ArrayProxy.extend({
  objectAtContent(index) {
    let selectedValue = this.selectedValue;
    let value = this.content[index];
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
      return isBlank(this.value);
    }
  }),

  showPrompt: computed('{hasNoValue,field.required}', {
    get() {
      return !this.field.required || this.hasNoValue;
    }
  }),

  options: computed('{field.options.[],value}', {
    get() {
      let selectedValue = this.value;
      let content = this.field.options || [];
      return OptionsList.create({content, selectedValue});
    }
  })
});
