var Base = require('./base');
    Student = require('../models/student');

module.exports = Base.extend({
  url: '/students',
  model: Student,
  api: 'ts-api',

  getMaxGrade: function() {
    var retVal = 0,
        models = !!this.toJSON ? this.toJSON() : this.models,
        grade;
    if (models.length > 0) {
      models.forEach(function(model){
        grade = model.grade;
        if (grade > retVal) retVal = grade;
      });
    } else {
      retVal = 0;
    }
    return retVal;
  },

  getMinGrade: function() {
    var retVal = 100,
        models = !!this.toJSON ? this.toJSON() : this.models,
        grade;
    if (models.length > 0) {
      models.forEach(function(model){
        grade = model.grade;
        if (grade < retVal) retVal = grade;
      });
    } else {
      retVal = 0;
    }
    return retVal;
  },

  getAvgGrade: function() {
    var retVal,
        models = !!this.toJSON ? this.toJSON() : this.models,
        nums = models.map(function(model){ return +model.grade; }),
        sum = nums.reduce(function(prev, cur){ return prev + cur; }, 0);
    retVal = parseInt(sum/models.length, 10) || 0;
    return retVal;
  }

});
module.exports.id = 'Students';