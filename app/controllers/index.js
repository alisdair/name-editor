import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    saveName(name) {
      let model = this.get('model');

      model.set('name', name);

      return model.save();
    }
  }
});
