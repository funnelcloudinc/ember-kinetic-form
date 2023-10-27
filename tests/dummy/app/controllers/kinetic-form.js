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
      console.log('update fired');
    }
  }
});
