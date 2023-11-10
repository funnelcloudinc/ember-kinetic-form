import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const model = this.modelFor('application');

    delete model.schema.required;
    return model;
  },
});
