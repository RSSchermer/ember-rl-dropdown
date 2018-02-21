import Component from '@ember/component';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Component.extend(DropdownComponentMixin, {
  classNameBindings: ['dropdownExpanded']
});
