import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let properties = {};
    for (let i = 1; i <= 700; i++) {
      properties[`${i}`] = {
        title: `Test boolean #${i}`,
        description: 'Adipisicing alias earum quasi quaerat incidunt.',
        type: 'boolean',
        default: false
      };
    }

    return {
      schema: {
        type: 'object',
        title: 'Huge data set',
        required: [],
        properties
      }
    };
  }
});
