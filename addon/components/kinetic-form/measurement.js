import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../../templates/components/kinetic-form/measurement';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['kinetic-form--measurement'],
  classNameBindings: ['error:has-error', 'outOfBounds:has-error'],

  wrapperClass: computed(
    'field.informs_document_status',
    'outOfBounds',
    function () {
      const informsDocumentStatus = this.field.informs_document_status;
      const outOfBounds = this.outOfBounds;

      if (informsDocumentStatus && outOfBounds) {
        return 'ui error message';
      } else if (informsDocumentStatus) {
        return 'ui warning message';
      } else {
        return '';
      }
    }
  ),

  outOfBounds: computed(
    'value',
    'field.{lower_control_limit,upper_control_limit}',
    function () {
      const value = parseFloat(this.value);
      const lowerControlLimit = parseFloat(this.field.lower_control_limit);
      const upperControlLimit = parseFloat(this.field.upper_control_limit);

      if (isPresent(lowerControlLimit) && isPresent(upperControlLimit)) {
        return value < lowerControlLimit || value > upperControlLimit;
      } else if (isPresent(lowerControlLimit)) {
        return value < lowerControlLimit;
      } else if (isPresent(upperControlLimit)) {
        return value > upperControlLimit;
      } else {
        return false;
      }
    }
  ),

  actions: {
    updateNumber(value) {
      this.set('value', parseFloat(value));
      this.update(this.value);
    },
  },
});
