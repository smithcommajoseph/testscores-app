var _ = require('underscore'),
    BaseApp = require('rendr/shared/app');

module.exports = BaseApp.extend({

  defaults: _.extend({
    flashMsg: ''
  }, BaseApp.prototype.defaults),

  start: function() {
    // Show a loading indicator when the app is fetching.
    this.router.on('action:start', function() { this.set({loading: true});  }, this);
    this.router.on('action:end',   function() { this.set({loading: false}); }, this);

    // Call 'super'.
    BaseApp.prototype.start.call(this);
  }

});
