import Ember from 'ember';

export default Ember.Mixin.create({
  init: function (...args) {
    this._super.apply(this, args);

    this.set('boundClickoutHandler', Ember.run.bind(this, this.clickoutHandler));
    this.set('boundEscapeHandler', Ember.run.bind(this, this.escapeHandler));
  },

  onOpen() {},
  onClose() {},

  dropdownExpanded: false,

  dropdownToggleSelector: '.rl-dropdown-toggle',

  dropdownSelector: '.rl-dropdown',

  closingEventNamespace: 'rl-dropdown',

  closeOnEscape: true,

  actions: {
    toggleDropdown: function () {
      this.toggleProperty('dropdownExpanded');

      if (this.get('dropdownExpanded')) {
        this.get('onOpen')();
      } else {
        this.get('onClose')();
      }
    },

    openDropdown: function () {
      this.set('dropdownExpanded', true);
      this.get('onOpen')();
    },

    closeDropdown: function () {
      this.set('dropdownExpanded', false);
      this.get('onClose')();
    }
  },

  manageClosingEvents: Ember.on('didInsertElement', Ember.observer('dropdownExpanded', function () {
    let namespace = this.get('closingEventNamespace');
    let clickEventName = 'click.'+ namespace;
    let focusEventName = 'focusin.'+ namespace;
    let touchEventName = 'touchstart.'+ namespace;
    let escapeEventName = 'keydown.'+ namespace;
    let component = this;
    let $document = Ember.$(document);

    if (this.get('dropdownExpanded')) {

      /* Add clickout handler with 1ms delay, to allow opening the dropdown
       * by clicking e.g. a checkbox and binding to dropdownExpanded, without
       * having the handler close the dropdown immediately. */
      Ember.run.later(() => {
        $document.bind(clickEventName, {component: component}, component.boundClickoutHandler);
        $document.bind(focusEventName, {component: component}, component.boundClickoutHandler);
        $document.bind(touchEventName, {component: component}, component.boundClickoutHandler);
      }, 1);

      if (this.get('closeOnEscape')) {
        $document.bind(escapeEventName, {component: component}, component.boundEscapeHandler);
      }
    } else {
      $document.unbind(clickEventName, component.boundClickoutHandler);
      $document.unbind(focusEventName, component.boundClickoutHandler);
      $document.unbind(touchEventName, component.boundClickoutHandler);
      $document.unbind(escapeEventName, component.boundEscapeHandler);
    }
  })),

  unbindClosingEvents: Ember.on('willDestroyElement', function () {
    let namespace = this.get('closingEventNamespace');
    let $document = Ember.$(document);

    $document.unbind('click.'+ namespace, this.boundClickoutHandler);
    $document.unbind('focusin.'+ namespace, this.boundClickoutHandler);
    $document.unbind('touchstart.'+ namespace, this.boundClickoutHandler);
    $document.unbind('keydown.'+ namespace, this.boundEscapeHandler);
  }),

  clickoutHandler(event) {
    let component = event.data.component;
    let $c = component.$();
    let $target = Ember.$(event.target);

    /* There is an issue when the click triggered a dom change in the
     * dropdown that unloaded the target element. The ancestry of the target
     * can no longer be determined. We can check if html is still an ancestor
     * to determine if this has happened. The safe option then seems to be to
     * not close the dropdown, as occasionaly not closing the dropdown when it
     * should have closed, seems to be less bad for usability than occasionaly
     * closing the dropdown when it should not have closed.
     */
    if(component.get('dropdownExpanded') && $target.closest('html').length &&
      !($target.closest($c.find(component.get('dropdownToggleSelector'))).length ||
      $target.closest($c.find(component.get('dropdownSelector'))).length)
    ) {
      component.send('closeDropdown');
    }
  },

  escapeHandler(event) {
    if (event.keyCode === 27) {
      event.data.component.send('closeDropdown');
    }
  }
});
