import Ember from 'ember';

export default Ember.Component.extend({
  name: null,
  onSave: null,

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
      this.set('editedName', this.get('name'));
      this.set('isEditing', true);
    },

    onCancel() {
      this.set('isEditing', false);
    }
  }
});
