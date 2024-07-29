import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      schema: {
        title: 'foobar',
        type: 'object',
        properties: {
          1: {
            type: 'boolean',
            title: 'foo',
          },
          2: {
            type: 'passfail',
            title: 'Pass or fail',
          },
          3: {
            type: 'passfail',
            title: 'For Document Status - does it Pass or fail',
            informs_document_status: true,
          },
          4: {
            type: 'instructions',
            title: 'Here are my instructions',
          },
          5: {
            type: 'multiplechoice',
            title: 'Choose many',
            multiple_choice_options: ['Happy', 'Sad', 'Undecided'],
            allow_multiple_choice: true,
          },
          6: {
            type: 'measurement',
            title: 'Measurement',
            lower_control_limit: 1000,
            unit_of_measure: 'kg',
            informs_document_status: false,
            data_key: 'Measurement-123',
          },
          7: {
            type: 'measurement',
            title: 'Measurement',
            lower_control_limit: 10,
            upper_control_limit: 20,
            unit_of_measure: 'mm',
            informs_document_status: true,
            data_key: 'Measurement-456',
          },
          8: {
            type: 'measurement',
            title: 'Measurement',
            upper_control_limit: 20,
            unit_of_measure: 'mm',
            informs_document_status: true,
            data_key: 'Measurement-789',
          },
          9: {
            type: 'measurement',
            title: 'Measurement',
            unit_of_measure: 'mm',
            informs_document_status: false,
            data_key: 'Measurement-000',
          },
        },
        required: ['7', '2'],
      },
      form: [
        {
          type: 'section',
          title: 'Section 1',
          items: ['9', '6', '7', '8', '1', '2', '3', '4', '5'],
        },
      ],
    };
  },
});
