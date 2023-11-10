import SemanticUiKineticFormForm from 'ember-kinetic-form/components/semantic-ui-kinetic-form/form';

export default SemanticUiKineticFormForm.extend({
  actions: {
    saveAsIncomplete() {
      this.onSubmit(false);
    },
  },
});
