app.service('FormService', function ($http) {

  this.submitForm = function(todaysMood, todaysEntry){
    console.log(todaysMood, todaysEntry);
    var date = new Date;
    var mo = date.getMonth();
    return $http({
      method: 'POST',
      url: '/form',
      data: {
        rating: todaysMood,
        entry: todaysEntry,
        month: mo
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error adding data to server', err);
    });
  }

  this.searchForms = function(searchType, searchQuery){
    return $http({
      method: 'GET',
      url: '/form/'+searchType+searchQuery
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error getting data from server', err);
    });
  }
});
