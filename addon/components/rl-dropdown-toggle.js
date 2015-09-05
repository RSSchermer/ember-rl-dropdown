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

  propagateClicks: true,

  click: function (event) {
    let propagateClicks = this.get('propagateClicks');

    this.sendAction();

    if (propagateClicks === false || propagateClicks === "false") {
      event.stopPropagation();
    }
  }
});
