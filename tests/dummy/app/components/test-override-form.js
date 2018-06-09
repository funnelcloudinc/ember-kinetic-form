import Ember from 'ember';
import SemanticUiKineticFormForm from 'ember-kinetic-form/components/semantic-ui-kinetic-form/form';

const { get } = Ember;

export default SemanticUiKineticFormForm.extend({
  actions: {
    saveAsIncomplete() {
      get(this, 'onSubmit')(false);
    }
  }
});
