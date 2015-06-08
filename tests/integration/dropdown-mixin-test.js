import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

var App;

module('Dropdown mixin integration Tests', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('the dropdown should not be visible initialy', function (assert) {
  visit('/dropdown-mixin-test');

  Ember.run(function () {
    assert.equal(Ember.$('.user-controls-dropdown').length, 0);
  });
});

test('the dropdown should be visible after clicking the checkbox', function (assert) {
  visit('/dropdown-mixin-test');

  Ember.run(function () {
    click('#dropdownCheckbox');

    andThen(function () {
      assert.equal(Ember.$('.user-controls-dropdown').length, 1);
    });
  });
});
