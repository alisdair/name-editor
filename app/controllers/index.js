import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveName(name) {
      let model = this.get('model');

      model.set('name', name);

      return model.save();
    }
  }
});
