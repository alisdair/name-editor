import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  isEditing: false,
  editedName: null,
  error: null,

  saveDisabled: computed.empty('editedName'),

  actions: {
    save() {
      this.attrs.save(this.get('editedName')).then(() => {
        this.set('isEditing', false);
        this.set('error', null);
      }).catch(error => {
        this.set('error', error);
      });
    },

    edit() {
      this.set('editedName', this.get('name'));
      this.set('isEditing', true);
    },

    cancel() {
      this.set('isEditing', false);
    }
  }
});
