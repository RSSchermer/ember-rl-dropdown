import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dropdown-test');
  this.route('dropdown-mixin-test');
  this.route('dropdown-with-checkbox-test');
});

export default Router;
