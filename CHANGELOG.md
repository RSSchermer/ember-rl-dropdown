# Ember-rl-dropdown change log

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
