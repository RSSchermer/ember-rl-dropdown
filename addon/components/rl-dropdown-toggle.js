import Ember from 'ember';
import RlDropdownContainer from './rl-dropdown-container';

export default Ember.Component.extend({
  classNames: ['rl-dropdown-toggle'],

  tagName: 'button',

  attributeBindings: ['type'],

  type: Ember.computed('tagName', function () {
    return this.get('tagName') === 'button' ? 'button' : null;
  }),

  dropdownContainer: Ember.computed(function () {
    return this.nearestOfType(RlDropdownContainer);
  }),

  action: 'toggleDropdown',

  propagateClicks: true,

  click(event) {
    let propagateClicks = this.get('propagateClicks');

    this.get('dropdownContainer').send(this.get('action'));

    if (propagateClicks === false || propagateClicks === 'false') {
      event.stopPropagation();
    }
  }
});
