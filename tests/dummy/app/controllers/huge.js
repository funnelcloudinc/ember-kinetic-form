import Ember from 'ember';

const {
  Controller,
  get,
  computed,
  computed: { reads }
} = Ember;

export default Controller.extend({
  sampleModel: {},
  semanticUI: true,

  queryParams: ['semanticUI'],

  sampleDefinition: reads('model'),
  sampleSize: computed('model', {
    get() {
      let properties = get(this, 'model.schema.properties') || {};
      return Object.keys(properties).length;
    }
  }),

  actions: {
    sendToServer() {
      alert('fake sent');
    }
  }
});
