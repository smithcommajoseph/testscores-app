module.exports = {

  index: function(params, callback) {
    var spec = {
      collection: {collection: 'Students', params: params}
    };
    this.app.fetch(spec, function(err, res) {
      callback(err, res);
    });
  }

};