app.controller('EmergencyController', function($location, $http){
    console.log('EmergencyController is loaded');

    this.goToHome = function(){
      $location.path('/home');
    }

    this.sendMessage = function(){
      return $http({
        method: 'GET',
        url: '/text/user'
      }).then(function(response){
        console.log('Success');
        return response;
      }).catch(function(err){
        console.log('Error getting data from server', err);
      });
    }

  });
