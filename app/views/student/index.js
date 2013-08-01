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
    this._postRender();
    return this;
  },

  postRender: function() {
    this.reportIsPassing();
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

  onInputBlur: function(e) {
    var $this = $(e.currentTarget),
        name = $this.data('name'),
        value = $this.val(),
        updateOb = {};

    $this.removeClass('editing');
    if (this.model.get(name) == value) return;

    this.model.set(name, value);
    if (this.model.isValid()){
      this.saveIt($this);
    } else {
      this.displayError($this, this.model.validationError);
    }
  },

  saveIt: function($this) {
    var _this = this;

    this.model.save()
    .then(function(){
      _this.reportIsPassing();
      _this.app.set('flashMsg', ' ');
      _this.parentView.collection.set(_this.model, {remove: false});
    })
    .fail(function(){
      //could do some sweet server error parsing here... but alas, i'm cheaping out
      _this.displayError.call(_this, $this, 'The server rejected your request');
    });
  },

  displayError: function($this, msg) {
    $this.addClass('error');
    this.app.set('flashMsg', msg);
  },

  isPassing: function(){
    return this.model.get('grade') >= 65;
  },

  reportIsPassing: function() {
    if(this.isPassing()) this.$el.removeClass('warning');
    else this.$el.addClass('warning');
  }

});
module.exports.id = 'student/index';
