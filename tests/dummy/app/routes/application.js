import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return {
      schema: {
        title: 'foobar',
        type: 'object',
        properties: {
          '1': {
            type: 'boolean',
            title: 'foo'
          },
          '2': {
            type: 'boolean',
            title: 'bar craig'
          },
          '3': {
            type: 'boolean',
            title: 'baz'
          },
          '4': {
            type: 'boolean',
            title: 'frotz'
          }
        }
      },
      form: [
        '3',
        { key: '4', type: 'boolean' },
        {
          type: 'section',
          title: 'Section 1',
          items: [{ key: '2', type: 'radio' }, '1']
        }
      ]
    };
  }
});
