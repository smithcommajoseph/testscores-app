var RendrView = require('rendr/shared/base/view'),
    _ = require('underscore');

// Create a base view, for adding common extensions to our
// application's views.
module.exports = RendrView.extend({

  getTemplateData: function() {
    var options = _.clone(this.options);
    if (this.model) {
      return _.defaults( this.model.toJSON(), options);
    } else if (this.collection) {
      return _.defaults({
        models: this.collection.toJSON(),
        meta: this.collection.meta,
        params: this.collection.params
      }, options);
    } else {
      return options;
    }
  }

});
