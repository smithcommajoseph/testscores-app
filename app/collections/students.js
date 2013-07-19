var Base = require('./base');
    Student = require('../models/student');

module.exports = Base.extend({
  url: '/students',
  model: Student,
  api: 'ts-api',

  getMaxGrade: function() {
    var retVal = 0,
        grade;
    if (this.length > 0) {
      this.models.forEach(function(model){
        grade = model.get('grade');
        if (grade > retVal) retVal = grade;
      });
    } else {
      retVal = 0;
    }
    return retVal;
  },

  getMinGrade: function() {
    var retVal = 100,
        grade;
    if (this.length > 0) {
      this.models.forEach(function(model){
        grade = model.get('grade');
        if (grade < retVal) retVal = grade;
      });
    } else {
      retVal = 0;
    }
    return retVal;
  },

  getAvgGrade: function() {
    var retVal,
        nums = this.models.map(function(model){ return model.get('grade'); }),
        sum = nums.reduce(function(prev, cur){ return prev + cur; }, 0);
    retVal = parseInt(sum/this.length, 10) || 0;
    return retVal;
  }

});
module.exports.id = 'Students';