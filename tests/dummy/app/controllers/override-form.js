import Ember from 'ember';

const { Controller, computed: { reads }, set } = Ember;

export default Controller.extend({
  sampleDefinition: reads('model'),

  sampleModel: {},

  actions: {
    sendToServer(changeset, validated) {
      set(this, 'lastSubmitValidated', validated);
    }
  }
});
