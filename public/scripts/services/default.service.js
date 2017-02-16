app.service('DefaultService', function ($http) {

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
