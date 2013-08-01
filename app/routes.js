module.exports = function(match) {

  match('', 'home#index');
  match('students/:_id', 'students#show');

};