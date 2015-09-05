import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-dropdown'],

  isExpanded: Ember.computed.alias('parentView.dropdownExpanded'),

  closeOnChildClick: false,

  propagateClicks: true,

  manageVisibility: Ember.on('didInsertElement', Ember.observer('isExpanded', function () {
    if (this.get('isExpanded')) {
      this.$().css('display', 'block');
    } else {
      this.$().css('display', 'none');
    }
  })),

  click: function (event) {
    let closeOnChildClick = this.get('closeOnChildClick');
    let propagateClicks = this.get('propagateClicks');
    let $target = Ember.$(event.target);
    let $c = this.$();

    if ($target !== $c) {
      if ((closeOnChildClick === true || closeOnChildClick === "true") && $target.closest($c).length) {
        this.set('isExpanded', false);
      } else if (closeOnChildClick && $target.closest($c.find(closeOnChildClick)).length) {
        this.set('isExpanded', false);
      }
    }

    if (propagateClicks === false || propagateClicks === "false") {
      event.stopPropagation();
    }
  }
});
