import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

var App;

module('Dropdown integration Tests', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('the dropdown should not be visible initialy', function (assert) {
  visit('/dropdown-test');

  andThen(function () {
    assert.equal(Ember.$('.rl-dropdown').css('display'), 'none');
  });
});

test('the dropdown should be visible after clicking the toggle button', function (assert) {
  visit('/dropdown-test');

  click('.rl-dropdown-toggle');

  andThen(function () {
    assert.equal(Ember.$('.rl-dropdown').css('display'), 'block');
  });
});

test('the dropdown should not be visible after clicking the toggle button twice', function (assert) {
  visit('/dropdown-test');

  click('.rl-dropdown-toggle');

  andThen(function () {
    Ember.run.later(function() {
      click('.rl-dropdown-toggle');

      andThen(function () {
        assert.equal(Ember.$('.rl-dropdown').css('display'), 'none');
      });
    }, 2);
  });
});

test('the dropdown should not be visible after clicking the toggle and then clicking outside', function (assert) {
  visit('/dropdown-test');

  click('.rl-dropdown-toggle');

  andThen(function () {
    Ember.run.later(function () {
      click('#someOtherElement');

      andThen(function () {
        assert.equal(Ember.$('.rl-dropdown').css('display'), 'none');
      });
    }, 2);
  });
});

test('the dropdown should not be visible after clicking the toggle and then pressing Escape', function (assert) {
  visit('/dropdown-test');

  click('.rl-dropdown-toggle');

  andThen(function () {
    Ember.run.later(function () {
      keyEvent(document, "keydown", 27);

      andThen(function () {
        assert.equal(Ember.$('.rl-dropdown').css('display'), 'none');
      });
    }, 2);
  });
});
