import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import $ from 'jquery';
import RlDropdownContainer from './rl-dropdown-container';

export default Component.extend({
  classNames: ['rl-dropdown'],

  dropdownContainer: computed(function () {
    return this.nearestOfType(RlDropdownContainer);
  }),

  isExpanded: computed.alias('dropdownContainer.dropdownExpanded'),

  closeOnChildClick: false,

  propagateClicks: true,

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener('click', (e) => {
      this._click(e);
    });
  },

  manageVisibility: on('didInsertElement', observer('isExpanded', function () {
    if (this.get('isExpanded')) {
      this.$().css('display', 'block');
    } else {
      this.$().css('display', 'none');
    }
  })),

  _click(event) {
    let closeOnChildClick = this.get('closeOnChildClick');
    let propagateClicks = this.get('propagateClicks');
    let $target = $(event.target);
    let $c = this.$();

    if ($target !== $c) {
      if ((closeOnChildClick === true || closeOnChildClick === "true") && $target.closest($c).length) {
        this.set('isExpanded', false);
      } else if (closeOnChildClick && $target.closest(closeOnChildClick, $c).length) {
        this.set('isExpanded', false);
      }
    }

    if (propagateClicks === false || propagateClicks === "false") {
      event.stopPropagation();
    }
  }
});
