var BaseView = require('../base');

module.exports = BaseView.extend({

  className: 'student_index_view',
  tagName: 'tr',

  events: {
    'click .remove': 'onRemoveClick',
    'focus input': 'onInputFocus',
    'blur input': 'onInputBlur',
    'keypress input': 'onInputKeypress'
  },

  render: function() {
    var html = this.getHtml();
    this.setElement(html);
    this.reportIsPassing();
    return this;
  },

  postRender: function() {
    this.reportIsPassing(); //occurs on page load only
  },

  onRemoveClick: function(e) {
    e.preventDefault();
    var _this = this;
    this.parentView.collection.remove(this.model);
    this.model.destroy({id: this.model.id})
    .success(function(){
      _this.remove();
    })
    .fail(function(){ alert('derp!'); });
  },

  onInputFocus: function(e) {
    var $this = $(e.currentTarget);
    $this.addClass('editing').removeClass('error');
  },

  onInputKeypress: function(e){
    var $this = $(e.currentTarget);
    if (e.which == 13) $this.trigger('blur');
  },

  // this dude has gotten too big and should likely be broken up to some other fns
  onInputBlur: function(e) {
    var $this = $(e.currentTarget),
        name = $this.data('name'),
        value = $this.val(),
        updateOb = {},
        _this = this;

    $this.removeClass('editing');
    if (this.model.get(name) == value) return;

    this.model.set(name, value);
    if (this.model.isValid()){
      this.model.save()
      .then(function(){
        _this.reportIsPassing();
        $('#alert').find('button').trigger('click');
        _this.parentView.collection.set(_this.model, {remove: false});
      })
      .fail(function(){
        $this.addClass('error');
        //could do some sweet server error parsing here... but alas, i'm cheaping out
        $('#alert').show().find('#alert-error').html('The server rejected your request');
      });
    } else {
      $this.addClass('error');
      $('#alert').show().find('#alert-error').html(this.model.validationError);
    }
  },

  isPassing: function(){
    return this.model.get('grade') >= 65;
  },

  reportIsPassing: function() {
    if(!isServer){
      if(this.isPassing()) this.$el.removeClass('warning');
      else this.$el.addClass('warning');
    }
  }

});
module.exports.id = 'student/index';
