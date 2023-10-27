import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';

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
