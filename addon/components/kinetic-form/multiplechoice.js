import Component from '@ember/component';
import { set, get } from '@ember/object';
import layout from '../../templates/components/kinetic-form/multiplechoice';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--multiplechoice'],
  classNameBindings: ['error:has-error'],

  init() {
    this._super(...arguments);
    const value = get(this, 'value')

    if (!value) {
      const numberOfChoices = get(this, 'field.multiple_choice_options.length');
      const initialValue = Array(numberOfChoices).fill(false);
  
      set(this, 'workingValue', initialValue);
    } else {
      set(this, 'workingValue', [...value]);
    }
  },

  actions: {
    updateChoice(index) {
      let updatedValue;
      const choices = get(this, 'workingValue');

      if (get(this, 'field.allow_multiple_choice')) {
        updatedValue = [...choices];  
      } else {
        const numberOfChoices = get(this, 'field.multiple_choice_options.length');

        updatedValue = Array(numberOfChoices).fill(false);
      }

      updatedValue.replace(index, 1, [ !choices[index] ]);

      set(this, 'workingValue', [...updatedValue]);

      if (updatedValue.every(a => !a)) {
        // Reset to no input if no answers are selected.
        get(this, 'update')('');  
      } else {
        get(this, 'update')(updatedValue);
      }
    }
  }
});
