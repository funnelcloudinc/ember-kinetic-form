import Component from '@ember/component';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import layout from '../../templates/components/kinetic-form/section';

export default Component.extend({
  layout,
  classNames: ['kinetic-form--section'],

  anchor: computed('{field.title,elementId}', {
    get() {
      let title = this.field.title || `section-${this.elementId}`;
      return dasherize(title);
    },
  }),
});
