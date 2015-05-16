import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-dropdown-toggle'],

  tagName: 'button',

  attributeBindings: ['type'],

  type: function () {
    return this.get('tagName') === 'button' ? 'button' : null;
  }.property('tagName'),

  targetObject: function () {
    return this.get('parentView');
  }.property('parentView'),

  action: 'toggleDropdown',

  click: function () {
    this.sendAction();
    return false;
  }
});
