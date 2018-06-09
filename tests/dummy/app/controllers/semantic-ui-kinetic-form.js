import Ember from 'ember';

const { Controller, computed: { reads } } = Ember;

export default Controller.extend({
  sampleDefinition: reads('model'),

  sampleModel: {},

  actions: {
    sendToServer() {
      alert('fake sent');
    },
    update() {
      console.log('update fired');
    }
  }
});
