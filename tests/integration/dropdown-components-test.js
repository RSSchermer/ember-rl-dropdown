import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('rl-dropdown-container', 'Dropdown components integration', {
  integration: true
});

test('The dropdown should not be displayed initially', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  assert.equal(this.$('.rl-dropdown').css('display'), 'none');
});

test('`isExpanded` correctly controls dropdown visibility', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown isExpanded=isExpanded}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  let $dropdown = this.$('.rl-dropdown');

  this.set('isExpanded', false);
  assert.equal($dropdown.css('display'), 'none', 'The dropdown should not be displayed if `isExpanded` is false');

  this.set('isExpanded', true);
  assert.equal($dropdown.css('display'), 'block', 'The dropdown should be displayed if `isExpanded` is true');
});

test('The toggle button correctly controls dropdown visibility', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  let $dropdown = this.$('.rl-dropdown');
  let $toggleButton = this.$('.rl-dropdown-toggle');

  assert.equal($dropdown.css('display'), 'none', 'The dropdown is not displayed initially');

  $toggleButton.click();
  assert.equal($dropdown.css('display'), 'block', 'The dropdown is displayed after clicking the toggle button');

  $toggleButton.click();
  assert.equal($dropdown.css('display'), 'none', 'The dropdown is none displayed after clicking the toggle button twice');
});

test('The dropdown does not close when clicked on', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown isExpanded=true}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  let $dropdown = this.$('.rl-dropdown');

  $dropdown.click();

  assert.equal($dropdown.css('display'), 'block');
});

test('The dropdown closes when clicking outside', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown isExpanded=true}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}

    <div id="some-other-element">asdf</div>
  `);

  let $dropdown = this.$('.rl-dropdown');

  assert.equal($dropdown.css('display'), 'block', 'The dropdown is displayed initially');

  // Click outside with a slight delay, because the event listener for outside clicks isn't added immediately
  Ember.run.later(() => {
    this.$().parent().find('#some-other-element').click();

    assert.equal($dropdown.css('display'), 'none', 'The dropdown is not displayed after clicking outside');
  }, 2);
});

test('`closeOnChildClick` correctly affects whether or not the dropdown closes when child elements are clicked', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown isExpanded=true closeOnChildClick=closeOnChildClick}}
        <li><a href="#">Link</a></li>
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  let $dropdown = this.$('.rl-dropdown');

  this.set('closeOnChildClick', false);
  $dropdown.find('a').click();
  assert.equal($dropdown.css('display'), 'block', 'The dropdown should not close when `closeOnChildClick` is false');

  this.set('closeOnChildClick', true);
  $dropdown.find('a').click();
  assert.equal($dropdown.css('display'), 'none', 'The dropdown should close when `closeOnChildClick` is true');

  this.set('closeOnChildClick', 'a:link');
  $dropdown.find('li').click();
  assert.equal($dropdown.css('display'), 'block', 'The dropdown should not close when `closeOnChildClick` selector is not matched');

  this.set('closeOnChildClick', 'a:link');
  $dropdown.find('a').click();
  assert.equal($dropdown.css('display'), 'none', 'The dropdown should close when `closeOnChildClick` selector is matched');
});

test('A checkbox inside the dropdown should properly check and uncheck', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container}}
      {{#rl-dropdown-toggle}}Toggle{{/rl-dropdown-toggle}}

      {{#rl-dropdown}}
        {{input id="checkbox-in-dropdown" type="checkbox" checked=checkedCheckbox}}
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  this.set('checkedCheckbox', false);

  this.$('#checkbox-in-dropdown').click();
  assert.equal(this.get('checkedCheckbox'), true, 'The checkbox should get checked when clicked on');

  this.$('#checkbox-in-dropdown').click();
  assert.equal(this.get('checkedCheckbox'), false, 'The checkbox unchecks when it is clicked on a second time');
});

test('The container should pass a boolean block param that reflects whether the dropdown is expanded or not', function (assert) {
  this.render(hbs`
    {{#rl-dropdown-container as |dropdownExpanded|}}
      {{#rl-dropdown-toggle}}
        {{#if dropdownExpanded}}
          Close
        {{else}}
          Expand
        {{/if}}
      {{/rl-dropdown-toggle}}

      {{#rl-dropdown isExpanded=isExpanded}}
        ...
      {{/rl-dropdown}}
    {{/rl-dropdown-container}}
  `);

  let $dropdownToggle = this.$('.rl-dropdown-toggle');

  this.set('isExpanded', false);
  assert.equal($dropdownToggle.text().trim(), 'Expand', 'The dropdown toggle text should be "Expand" if `isExpanded` is false');

  this.set('isExpanded', true);
  assert.equal($dropdownToggle.text().trim(), 'Close', 'The dropdown toggle text should be "Close" if `isExpanded` is true');
});
