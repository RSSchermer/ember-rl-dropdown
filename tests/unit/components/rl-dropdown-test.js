import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('rl-dropdown', 'RlDropdownComponent', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('is not displayed when isExpanded is not true', function () {
  var component = this.subject();
  var $component = this.append();

  equal($component.css('display'), 'none');
});

test('is displayed when isExpanded is true', function () {
  var component = this.subject();
  var $component = this.append();

  component.set('isExpanded', true);

  equal($component.css('display'), 'block');
});

test('does not close when clicked on', function () {
  var component = this.subject();
  var $component = this.append();

  component.set('isExpanded', true);

  $component.click();

  Ember.run(function () {
    equal($component.css('display'), 'block');
  });
});

test('does not close when clicking on a child element when closeOnChildClick is not true', function () {
  var component = this.subject();
  var $component = this.append();

  component.set('isExpanded', true);

  $component.append('<a href="#">Link</a>');

  $component.find('a').click();

  Ember.run(function () {
    equal($component.css('display'), 'block');
  });
});

test('does close when clicking on a child element when closeOnChildClick is true', function () {
  var component = this.subject();
  var $component = this.append();

  component.setProperties({ 'isExpanded': true, 'closeOnChildClick': true });
  $component.append('<a href="#">Link</a>').click();

  $component.find('a').click();

  Ember.run(function () {
    equal($component.css('display'), 'none');
  });
});

test('does not close when clicking on a child element when closeOnChildClick selector is not matched', function () {
  var component = this.subject();
  var $component = this.append();

  component.setProperties({ 'isExpanded': true, 'closeOnChildClick': 'a:link' });
  $component.append('<a>Link</a>').click();

  $component.find('a').click();

  Ember.run(function () {
    equal($component.css('display'), 'block');
  });
});

test('does close when clicking on a child element when closeOnChildClick selector is matched', function () {
  var component = this.subject();
  var $component = this.append();

  component.setProperties({ 'isExpanded': true, 'closeOnChildClick': 'a:link' });
  $component.append('<a href="#">Link</a>').click();

  $component.find('a').click();

  Ember.run(function () {
    equal($component.css('display'), 'none');
  });
});
