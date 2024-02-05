import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      schema: {
        title: 'foobar',
        type: 'object',
        properties: {
          2: {
            type: 'boolean',
            title: 'bar craig',
          },
          4: {
            type: 'boolean',
            title: 'frotz',
          },
          7: {
            type: 'instructions',
            title: 'Here are my instructions\nStep 1 - - -\nStep 2 - - -',
          },
          8: {
            type: 'multiplechoice',
            title: 'Choose many',
            multiple_choice_options: ['Happy', 'Sad', 'Undecided'],
            allow_multiple_choice: true,
          },
        },
        required: ['8'],
      },
      form: [
        { key: '4', type: 'boolean' },
        {
          type: 'section',
          title: 'Section 1',
          items: [
            { key: '2', type: 'radio' },
            {
              type: 'section',
              title: 'Nested Section',
              items: ['7', '8'],
            },
          ],
        },
      ],
    };
  },
});
