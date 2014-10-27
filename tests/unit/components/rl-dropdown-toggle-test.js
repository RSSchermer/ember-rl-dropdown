import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('rl-dropdown-toggle', 'RlDropdownToggleComponent', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('sends the toggleDropdown action when clicked', function () {
  var component = this.subject();

  var targetObject = {
    toggleDropdown: function(){
      ok(true, 'external Action was called!');
    }
  };

  Ember.run(function(){
    component.setProperties({ 'targetObject': targetObject });
  });

  Ember.run(function(){
    component.send('click');
  });
});
