import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sampleDefinition: {
    "schema": {
      "type": "object",
      "title": "Team Member 1 - First Shift TPM",
      "required": [
        "confirm"
      ],
      "properties": {
        "1": {
          "title": "Station 5",
          "description": "Inspect & clean prox sensors, locator pins, clamps, damaged wiring, slag, inspect bowl feeder, and sweep station",
          "type": "boolean",
          "default": false
        },
        "2": {
          "title": "Station 10",
          "description": "Inspect & clean prox sensors, locator pins, clamps, damaged wiring & slag sweep station",
          "type": "boolean",
          "default": false
        },
        "3": {
          "title": "10 R1 MIG Wire Barrel",
          "description": "Inspect wire barrel for damage and check to see if the barrel has sufficent wire if not notify tl to get barrel exchanged",
          "type": "boolean",
          "default": false
        },
        "4": {
          "title": "Air Gauges",
          "description": "Verify air pressure is reading 75 - 95 psi , wipe off dust",
          "type": "boolean",
          "default": false
        },
        "confirm": {
          "title": "Everything OK",
          "description": "Did you have any issues with this TPM?",
          "type": "boolean",
          "default": false
        }
      }
    },
    "form": [
      {
        "key": "confirm",
        "type": "radios"
      }
    ]
  },

  sampleModel: {},

  actions: {
    sendToServer() {
      alert('fake sent');
    }
  }
});
