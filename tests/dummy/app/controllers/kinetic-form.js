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
      console.log('update fired');
    }
  }
});
