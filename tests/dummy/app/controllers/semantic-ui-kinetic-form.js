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

      // eslint-disable-next-line no-undef
      return new Promise((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log('update fired');
          return resolve();
        }, 3000);
      });
    }
  }
});
