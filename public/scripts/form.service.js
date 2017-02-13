app.service('FormService', function ($http) {

  this.submitForm = function(todaysMood, todaysEntry){
    return $http({
      method: 'POST',
      url: '/form',
      data: {
        mood: todaysMood,
        entry: todaysEntry
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error adding data to server', err);
    });
  }
});
