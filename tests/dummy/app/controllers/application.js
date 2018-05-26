import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sampleDefinition: {
    "schema": {
      "type": "object",
      "title": "RH Apron Rail - Lift Assist",
      "required": [],
      "properties": {
        "1": {
          "title": "Operator Control and Material Handler",
          "description": "Air clean fixture base",
          "type": "boolean",
          "default": false
        },
        "2": {
          "title": "Operator Control and Material Handler",
          "description": "Inspect and repair switches and tooling",
          "type": "boolean",
          "default": false
        },
        "3": {
          "title": "Operator Control and Material Handler",
          "description": "Inspect and repair air lines",
          "type": "boolean",
          "default": false
        },
        "4": {
          "title": "Operator Control and Material Handler",
          "description": "Verify all operator controls are working properly",
          "type": "boolean",
          "default": false
        },
        "5": {
          "title": "Operator Control and Material Handler",
          "description": "Check grippers for damage and wear",
          "type": "boolean",
          "default": false
        },
        "6": {
          "title": "Breaking Assembly Section",
          "type": "section"
        },
        "7": {
          "title": "Braking Assembly",
          "description": "Verify cylinders are in good working condition (no leaks)",
          "type": "boolean",
          "default": false
        },
        "8": {
          "title": "Braking Assembly (Lower Brake)",
          "description": "Measure and record in millimeters the brake pad and brake disk thickness",
          "type": "string"
        },
        "9": {
          "title": "Braking Assembly (Middle Brake)",
          "description": "Measure and record in millimeters the brake pad and brake disk thickness",
          "type": "string"
        },
        "10": {
          "title": "Braking Assembly (Top Brake)",
          "description": "Measure and record in millimeters the brake pad and brake disk thickness",
          "type": "string"
        },
        "11": {
          "title": "Comments",
          "type": "string"
        }
      }
    },
    "form": [{
      "key": "11",
      "type": "textarea"
    }]
  },

  sampleModel: {},

  actions: {
    sendToServer() {
      alert('fake sent');
    }
  }
});
