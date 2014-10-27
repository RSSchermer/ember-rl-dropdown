import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-dropdown-toggle'],

  tagName: 'button',

  targetObject: function () {
    return this.get('parentView');
  }.property('parentView'),

  action: 'toggleDropdown',

  click: function () {
    this.sendAction();
  }
});
