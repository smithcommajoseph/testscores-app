module.exports = {

  show: function(params, callback) {
    var spec = {
      model: {model: 'Student', params: params}
    };
    this.app.fetch(spec, function(err, res) {
      callback(err, res);
    });    
  }

};