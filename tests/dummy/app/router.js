import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('kinetic-form');
  this.route('semantic-ui-kinetic-form');
});

export default Router;
