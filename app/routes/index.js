import Ember from 'ember';

let ModelClass = Ember.Object.extend({
  name: null,

  save() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Simulates a very flaky server
      if (Math.random() < 0.25) {
        Ember.Logger.error('server error');
        reject('Server error, please try again');
      } else {
        Ember.Logger.info('saved model');
        resolve();
      }
    });
  }
});

export default Ember.Route.extend({
  model() {
    return ModelClass.create({
      name: 'Model Name'
    });
  }
});
