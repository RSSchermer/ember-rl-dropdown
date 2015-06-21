import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dropdownTest', { path: '/dropdown-test' });
  this.route('dropdownMixinTest', { path: '/dropdown-mixin-test' });
  this.route('dropdownWithCheckboxTest', { path: '/dropdown-with-checkbox-test' });
});

export default Router;
