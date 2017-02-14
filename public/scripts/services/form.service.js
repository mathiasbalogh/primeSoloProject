app.service('FormService', function ($http) {

  this.submitForm = function(todaysMood, todaysEntry){
    console.log(todaysMood, todaysEntry);
    return $http({
      method: 'POST',
      url: '/form',
      data: {
        rating: todaysMood,
        entry: todaysEntry
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error adding data to server', err);
    });
  }

  this.searchForms = function(searchQuery){
    return $http({
      method: 'GET',
      url: '/form/'+searchQuery
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error adding data to server', err);
    });
  }
});
