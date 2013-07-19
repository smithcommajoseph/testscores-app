var BaseView = require('../base'),
    StudentView = require('../student/index'),
    _ = require('underscore');

module.exports = BaseView.extend({

  className: 'home_index_view',

  events: {
    'submit #add-record': 'onAddRecord',
    'click .close': 'onAlertClose'
  },

  postInitialize: function() {
    if( isServer ) {
      this.options.students = this.renderStudents();
      this.options.maxGrade = this.collection.getMaxGrade();
      this.options.minGrade = this.collection.getMinGrade();
      this.options.avgGrade = this.collection.getAvgGrade();
    }
  },

  postRender: function() {
    this.addEventListeners();
  },

  addEventListeners: function() {
    this.collection.on('all', this.onCollectionChange.bind(this));
  },

  onCollectionChange: function() {
    $('#maxGrade').html(this.collection.getMaxGrade());
    $('#minGrade').html(this.collection.getMinGrade());
    $('#avgGrade').html(this.collection.getAvgGrade());
  },

  renderStudents: function() {
    var _this = this, html = [];
    if (isServer) {
      this.collection.models.forEach( function(model) {
        var student = new StudentView({model: model, app: _this.app});
        html.push(student.getHtml());
      });
    }
    return html.join('');
  },

  // this dude has gotten too big and should likely be broken up to some other fns
  onAddRecord: function(e) {
    e.preventDefault();
    var $this = $(e.currentTarget),
        _this = this,
        resArr = $this.serializeArray(),
        resOb = this.convertArrToOb(resArr),
        model,
        student;

    model = new this.collection.model(resOb, {app: this.app});
    if (model.isValid()) {
      model.save()
      .then(function(){
        _this.collection.add(model);
        student = new StudentView({model: model, app: _this.app, parentView: _this});
        $this.find('input').removeClass('error').val('');
        $('#alert').find('button').trigger('click');
        $('#records tbody').append(student.render().$el);
      })
      .fail(function(){
        $this.find('input').addClass('error');
        //could do some sweet server error parsing here... but alas, i'm cheaping out
        $('#alert').show().find('#alert-error').html('The server rejected your request');
      });
    } else {
      $this.find('input').addClass('error');
      $('#alert').show().find('#alert-error').html(model.validationError);
    }
  },

  onAlertClose: function(e) {
    $this = $(e.currentTarget);
    $this.parents('#alert').hide();
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
