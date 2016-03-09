import Ember from 'ember';

const { Logger, RSVP, Route } = Ember;

let ModelClass = Ember.Object.extend({
  name: null,

  save() {
    return new RSVP.Promise(function(resolve, reject) {
      // Simulates a very flaky server
      if (Math.random() < 0.25) {
        Logger.error('server error');
        reject('Server error, please try again');
      } else {
        Logger.info('saved model');
        resolve();
      }
    });
  }
});

export default Route.extend({
  model() {
    return ModelClass.create({
      name: 'Model Name'
    });
  }
});
