# Ember-rl-dropdown change log

## 0.9.0

Dropdown now closes when elements outside the dropdown receive focus. Fixes complicated bug in Firefox (see Pull Request
#18, thanks @tomasznapieralski!). 

## 0.8.0

Thanks to @hakubo, it is now possible to bind actions to the `onOpen` and `onClose` attributes on the
`rl-dropdown-container` component:

```hbs
{{#rl-dropdown-container onOpen=(action "myOnOpenHandler") onClose=(action "myOnCloseHandler")}}
  ...
{{/rl-dropdown-container}}
```

The `onOpen` action will be called when the dropdown is opened; the `onClose` action will be called when the dropdown
is closed.  

## 0.7.0

A block param was added to the `rl-dropdown-container` component indicating whether or not the dropdown is expanded,
which can be used to e.g. customize the toggle button text based on whether the dropdown is expanded or closed:

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

## 0.6.0

Fixes bug with the `propagateClicks` attribute so now clicks indeed propagate by default.

The `rl-dropdown-container` component now gets a `dropdown-expanded` class when the dropdown is expanded.

## 0.5.0

Previously click propagation on the `rl-dropdown-toggle` and `rl-dropdown` components was prevented by default. As of
this version they are not prevented by default. The `propagateClicks` attribute must now be set to `false` on either or
both of these components if you wish to prevent click event propagation on either or both.

## 0.4.0

Dropdowns should now close on touch-start on mobile.

## 0.3.0

Dropdowns should now close when pressing the Escape key. This can be disabled by setting `closeOnEscape` to `false`.

The `clickoutEventNamespace` option has been renamed to `closingEventsNamespace`.

## 0.2.0

Upgraded to ember-cli 0.2.x.

## 0.1.0

Added `type='button'` to dropdown toggles with button tags, to prevent IE from treating it like a submit button when
this is not intended.
