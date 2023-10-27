import { get } from '@ember/object';
import SemanticUiKineticFormForm from 'ember-kinetic-form/components/semantic-ui-kinetic-form/form';

export default SemanticUiKineticFormForm.extend({
  actions: {
    saveAsIncomplete() {
      get(this, 'onSubmit')(false);
    }
  }
});
