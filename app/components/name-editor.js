import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  editedName: null,
  error: null,

  saveDisabled: Ember.computed.empty('editedName'),

  actions: {
    onSave() {
      this.attrs.save(this.get('editedName')).then(() => {
        this.set('isEditing', false);
        this.set('error', null);
      }).catch(error => {
        this.set('error', error);
      });
    },

    onEdit() {
      this.set('editedName', this.attrs.name);
      this.set('isEditing', true);
    },

    onCancel() {
      this.set('isEditing', false);
    }
  }
});
