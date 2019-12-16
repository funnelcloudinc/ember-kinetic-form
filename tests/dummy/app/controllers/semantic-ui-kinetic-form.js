import Ember from 'ember';

const {
  Controller,
  computed: { reads }
} = Ember;

export default Controller.extend({
  sampleDefinition: reads('model'),

  sampleModel: {},

  actions: {
    sendToServer() {
      alert('fake sent');
    },
    update() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('update fired');
          return resolve();
        }, 3000);
      });
    }
  }
});
