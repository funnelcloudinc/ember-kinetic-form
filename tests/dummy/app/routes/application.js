import Route from '@ember/routing/route';

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
          },
          '6': {
            type: 'passfail',
            title: 'Pass or fail'
          },
          '7': {
            type: 'instructions',
            title: 'Here are my instructions'
          },
          '8': {
            type: 'multiplechoice',
            title: 'Choose many',
            multiple_choice_options: [
              'Happy',
              'Sad',
              "Undecided"
            ],
            allow_multiple_choice: true
          }
        }
      },
      form: [
        '3',
        { key: '4', type: 'boolean' },
        {
          type: 'section',
          title: 'Section 1',
          items: [{ key: '2', type: 'radio' }, '1','6','7','8']
        }
      ]
    };
  }
});
