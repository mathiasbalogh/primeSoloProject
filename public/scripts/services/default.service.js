app.service('DefaultService', function ($http) {

  this.checkRegistration = function(){
    return $http({
      method: 'GET',
      url: '/form/user'
    }).then(function(response){
      console.log('Success');
      return response.data;
    }).catch(function(err){
      console.log('Error getting data from server', err);
    });
  }

  this.getChartData = function(){
    return $http({
      method: 'GET',
      url: '/form/chart'
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error getting data from server', err);
    });
  }
});
