# Ember-rl-dropdown

THIS IS A LEGACY ADDON THAT'S NO LONGER ACTIVELY MAINTAINED. IF YOU'RE LOOKING FOR AN UP TO DATE ALTERNATIVE,
I'D RECOMMEND http://ember-basic-dropdown.com/

Simple dropdown component and mixin for Ember. While it is very straightforward to create toggle functionality in
Ember with the if-helper, this dropdown will also close on click-out or when pressing the Escape key.

[![Build Status](https://travis-ci.org/RSSchermer/ember-rl-dropdown.svg?branch=master)](https://travis-ci.org/RSSchermer/ember-rl-dropdown)

## Demo

Demo available [here](http://rsschermer.github.io/ember-rl-dropdown/).

## Installation

```bash
npm install --save-dev ember-rl-dropdown
```

This addon does not provide any css for the dropdown, but it should work well with frameworks such as Twitter Bootstrap
(see example below).

## Usage

```handlebars
<!-- Twitter Bootstrap dropdown menu example -->

{{#rl-dropdown-container class="dropdown"}}
  {{#rl-dropdown-toggle class="btn btn-default"}}
    Toggle <span class="caret"></span>
  {{/rl-dropdown-toggle}}

  {{#rl-dropdown tagName="ul" class="dropdown-menu" closeOnChildClick="a:link"}}
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
  {{/rl-dropdown}}
{{/rl-dropdown-container}}
```

The component tagnames and classes can be altered to work with your favorite framework or your own custom css.

`closeOnChildClick` may be set to a jQuery selector for child elements that should cause the dropdown to close when
clicked. The default behavior is for the dropdown to remain visible when the user interacts with its child elements.
Set it to `true` if any child element should close the dropdown.

`propagateClicks` may be set to `false` on the `rl-dropdown-toggle` component and/or the `rl-dropdown` component if
click events should not propagate up through the DOM from either or both of these components.

The `rl-dropdown-container` component also passes a boolean block param indicating whether or not the dropdown is
expanded, which can be used to e.g. customize the toggle button text based on whether the dropdown is expanded or
closed:

```hbs
{{#rl-dropdown-container as |dropdownExpanded|}}
  {{#rl-dropdown-toggle}}
    {{#if dropdownExpanded}}
      Close
    {{else}}
      Expand
    {{/if}}
  {{/rl-dropdown-toggle}}

  {{#rl-dropdown}}
    ...
  {{/rl-dropdown}}
{{/rl-dropdown-container}}
```

It is also possible to bind actions to the `onOpen` and `onClose` attributes on the `rl-dropdown-container` component:

```hbs
{{#rl-dropdown-container onOpen=(action "myOnOpenHandler") onClose=(action "myOnCloseHandler")}}
  ...
{{/rl-dropdown-container}}
```

The `onOpen` action will be called when the dropdown is opened; the `onClose` action will be called when the dropdown
is closed.  

## Mixin

When integrating dropdown functionality in your own components, you may prefer to use the mixin instead of using the
dropdown components. Be sure to add the `rl-dropdown-toggle` class to your dropdown toggle element, and to add the
`rl-dropdown` class to your dropdown element. You can send `toggleDropdown`, `closeDropdown` and `openDropdown` events
to toggle, close or open the dropdown.


```javascript
// app/components/user-controls.js
import Ember from 'ember';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Ember.Component.extend(DropdownComponentMixin, {
  // Some additional custom behaviour
});
```

```handlebars
<!-- app/templates/components/user-controls.hbs -->

<!-- Be sure to add the rl-dropdown-toggle class to your dropdown toggle element -->
<button class="rl-dropdown-toggle" {{action "toggleDropdown"}}>User controls</button>

{{#if dropdownExpanded}}
  <!-- Be sure to add the rl-dropdown class to your dropdown element -->
  <div class="user-controls-dropdown rl-dropdown">
    ...
    <a class="close-btn" {{action "closeDropdown"}}>Close</a>
  </div>
{{/if}}
```
