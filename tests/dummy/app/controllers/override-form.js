import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
import { set } from '@ember/object';

export default Controller.extend({
  sampleDefinition: reads('model'),

  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  sampleModel: {},

  actions: {
    sendToServer(changeset, validated) {
      set(this, 'lastSubmitValidated', validated);
    },
  },
});
