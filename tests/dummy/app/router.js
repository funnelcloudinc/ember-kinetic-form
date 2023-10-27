import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('kinetic-form');
  this.route('semantic-ui-kinetic-form');
  this.route('override-form');
});

export default Router;
