import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

let App;

module('Dropdown mixin integration', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    Ember.run(App, 'destroy');
  }
});

test('the dropdown should not be visible initialy', function (assert) {
  visit('/dropdown-mixin-test');

  andThen(() => {
    assert.equal(Ember.$('.user-controls-dropdown').length, 0);
  });
});

test('the dropdown should be visible after clicking the checkbox', function (assert) {
  visit('/dropdown-mixin-test');

  click('#dropdownCheckbox');

  andThen(() => {
    assert.equal(Ember.$('.user-controls-dropdown').length, 1);
  });
});
