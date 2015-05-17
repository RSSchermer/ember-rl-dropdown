import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-dropdown'],

  isExpanded: Ember.computed.alias('parentView.dropdownExpanded'),

  closeOnChildClick: false,

  manageVisibility: function () {
    if (this.get('isExpanded')) {
      this.$().css('display', 'block');
    } else {
      this.$().css('display', 'none');
    }
  }.observes('isExpanded').on('didInsertElement'),

  click: function (event) {
    var closeOnChildClick = this.get('closeOnChildClick');
    var $target = Ember.$(event.target);
    var $c = this.$();

    if ($target !== $c) {
      if ((closeOnChildClick === true || closeOnChildClick === "true") && $target.closest($c).length) {
        this.set('isExpanded', false);
      } else if (closeOnChildClick && $target.closest($c.find(closeOnChildClick)).length) {
        this.set('isExpanded', false);
      }
    }
    return false;
  }
});
