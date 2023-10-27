import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
import { set } from '@ember/object';

export default Controller.extend({
  sampleDefinition: reads('model'),

  sampleModel: {},

  actions: {
    sendToServer(changeset, validated) {
      set(this, 'lastSubmitValidated', validated);
    }
  }
});
