import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('rl-dropdown-toggle', 'RlDropdownToggleComponent', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('sends the toggleDropdown action when clicked', function (assert) {
  var component = this.subject();
  var $component = this.render();

  var targetObject = {
    toggleDropdown: function(){
      assert.ok(true, 'external Action was called!');
    }
  };

  Ember.run(function(){
    component.setProperties({ 'targetObject': targetObject });
  });

  Ember.run(function(){
    $component.click();
  });
});
