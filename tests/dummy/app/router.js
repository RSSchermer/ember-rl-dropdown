import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dropdownTest', { path: '/dropdown-test' });
  this.route('dropdownMixinTest', { path: '/dropdown-mixin-test' });
  this.route('dropdownWithCheckboxTest', { path: '/dropdown-with-checkbox-test' });
});

export default Router;
