import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

var App;

module('Dropdown integration Tests', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('the dropdown should not be visible initialy', function () {
  visit('/dropdown-test');

  Ember.run(function () {
    equal(Ember.$('.rl-dropdown').css('display'), 'none');
  });
});

test('the dropdown should be visible after clicking the toggle button', function () {
  visit('/dropdown-test');

  Ember.$('.rl-dropdown-toggle').click();

  Ember.run(function () {
    equal(Ember.$('.rl-dropdown').css('display'), 'block');
  });
});

test('the dropdown should not be visible after clicking the toggle button twice', function () {
  visit('/dropdown-test');

  Ember.$('.rl-dropdown-toggle').click();
  Ember.$('.rl-dropdown-toggle').click();

  Ember.run(function () {
    equal(Ember.$('.rl-dropdown').css('display'), 'none');
  });
});

test('the dropdown should not be visible after clicking the toggle and then clicking outside', function () {
  visit('/dropdown-test');

  Ember.$('.rl-dropdown-toggle').click();
  Ember.$('body').click();

  Ember.run(function () {
    equal(Ember.$('.rl-dropdown').css('display'), 'none');
  });
});
