import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { dasherize } from '@ember/string';
import layout from '../../templates/components/kinetic-form/section';

export default Component.extend({
  layout,
  classNames: ['kinetic-form--section'],

  anchor: computed('{field.title,elementId}', {
    get() {
      let title = get(this, 'field.title') || `section-${this.elementId}`;
      return dasherize(title);
    }
  })
});
