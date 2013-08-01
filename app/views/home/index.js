var BaseView = require('../base'),
    StudentView = require('../student/index'),
    _ = require('underscore');

module.exports = BaseView.extend({

  className: 'home_index_view',

  events: {
    'submit #add-record': 'onAddRecord'
  },

  postRender: function() {
    this.collection.on('all', this.onCollectionChange.bind(this));
  },

  onCollectionChange: function() {
    $('#maxGrade').html(this.collection.getMaxGrade());
    $('#minGrade').html(this.collection.getMinGrade());
    $('#avgGrade').html(this.collection.getAvgGrade());
  },

  // this dude has gotten too big and should likely be broken up to some other fns
  onAddRecord: function(e) {
    e.preventDefault();
    var $this = $(e.currentTarget),
        _this = this,
        resArr = $this.serializeArray(),
        resOb = this.convertArrToOb(resArr),
        model = new this.collection.model(resOb, {app: this.app});

    if (model.isValid()) {
      this.saveIt($this, model);
    } else {
      this.displayError($this, model.validationError);
    }
  },

  saveIt: function($this, model) {
    var _this = this,
        student;

    model.save()
    .then(function(){
      _this.collection.add(model);
      student = new StudentView({model: model, app: _this.app, parentView: _this});
      $this.find('input').removeClass('error').val('');
      _this.app.set('flashMsg', ' ');
      $('#records tbody').append(student.render().$el);
    })
    .fail(function(){
      _this.displayError.call(_this, $this, 'The server rejected your request');
    });
  },

  displayError: function($this, msg) {
    $this.find('input').addClass('error');
    this.app.set('flashMsg', msg);
  },

  convertArrToOb: function(arr) {
    var ob = {};
    arr.forEach(function(v){
      ob[v.name] = v.value;
    });
    return ob;
  }

});
module.exports.id = 'home/index';
