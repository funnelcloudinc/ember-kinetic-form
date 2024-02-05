import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  sampleDefinition: reads('model'),

  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
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
    },
  },
});
