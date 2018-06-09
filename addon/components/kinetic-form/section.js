import Ember from 'ember';
import layout from '../../templates/components/kinetic-form/section';

const {
  Component,
  computed,
  get,
  String: { dasherize }
} = Ember;

export default Component.extend({
  layout,
  classNames: ['kinetic-form--section'],

  anchor: computed('field.title', {
    get() {
      let title = get(this, 'field.title') || `section-${get(this, 'elementId')}`;
      return dasherize(title);
    }
  })
});
