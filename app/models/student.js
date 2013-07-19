var Base = require('./base'),
    _ = require('underscore');

module.exports = Base.extend({

  url: function(){
    if(this.id) return '/students/'+this.id;
    else return '/students';
  },
  idAttribute: '_id',
  api: 'ts-api',

  validate: function(props, options) {
    var name = props.name,
        grade = +props.grade;

    if (!_.isNumber(grade)) {
      return 'grade must be a number';
    }
    if (props.grade < 0 || props.grade > 100) {
      return 'invalid grade range, bro';
    }
    if (name.match(/\d/)) {
      return 'it seems you\'ve entered an invalid name';
    }
  }

});
module.exports.id = 'Student';