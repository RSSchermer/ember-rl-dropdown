import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-dropdown-toggle'],

  tagName: 'button',

  attributeBindings: ['type'],

  type: Ember.computed('tagName', function () {
    return this.get('tagName') === 'button' ? 'button' : null;
  }),

  targetObject: Ember.computed.alias('parentView'),

  action: 'toggleDropdown',

  click: function (event) {
    this.sendAction();
    event.stopPropagation();
  }
});
