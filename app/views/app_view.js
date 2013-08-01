var BaseAppView = require('rendr/shared/base/app_view');

var $body = $('body'),
    $alert = $('#alert');

module.exports = BaseAppView.extend({

  timeout: null,

  events: {
     'click #alert .close': 'onAlertClose'
  },

  postInitialize: function() {
    this.addEventListeners();
  },

  addEventListeners: function() {
    this.app.on('change:loading', this.onLoadingChange, this);
    this.app.on('change:flashMsg', this.onFlashMessageChange, this);
  },

  onLoadingChange: function(app, loading) {
    $body.toggleClass('loading', loading);
  },

  onFlashMessageChange: function() {
    var _this = this,
        flashMsg = this.app.get('flashMsg');
    clearTimeout(this.timeout);
    if (flashMsg == ' ') $alert.find('.close').trigger('click');
    else {
      $alert.show().find('#alert-error').html(flashMsg);
      this.timeout = setTimeout(function(){ _this.app.set('flashMsg', ' '); }, 5000);
    }
  },

  onAlertClose: function(e) {
    $this = $(e.currentTarget);
    $alert.hide();
  }

});
