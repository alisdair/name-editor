import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let { resolve } = Ember.RSVP;

let features = Ember.Service.extend({
  isEnabled() {
    return false;
  }
});

moduleForComponent('name-editor', 'Integration | Component | name editor', {
  integration: true,
  beforeEach() {
    this.register('service:features', features);
    Ember.getOwner(this).inject('component', 'features', 'service:features');
  }
});

test('basic operation', function(assert) {
  assert.expect(7);

  this.set('name', 'Potato');
  this.set('actions', {
    saveName(name) {
      assert.equal(name, 'Tomato', 'clicking Save calls saveName with new name');

      this.set('name', name);

      return resolve();
    }
  });
  this.render(hbs`
    {{name-editor
      name=name
      save=(action "saveName")}}
  `);

  assert.equal(this.$('form').length, 0, 'form hidden by default');

  let $header = this.$('h3');

  assert.equal($header.text().trim(), 'Potato', 'shows current name in header');

  this.$('h3.is-editable').click();

  assert.equal(this.$('h3').length, 0, 'clicking the header hides it');
  assert.equal(this.$('form').length, 1, 'clicking the header shows the form');

  let $input = this.$('input');

  assert.equal($input.val(), 'Potato', 'shows form input with name');

  $input.val('Tomato').change();
  this.$('button:contains(Save name)').click();

  $header = this.$('h3');
  assert.equal($header.text().trim(), 'Tomato',
               'saving closes the form and shows the new name');
});
