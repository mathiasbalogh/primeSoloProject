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
        $location.path('/home');
        swal({
          title: "Message Sent",
          text: "Your Emergency Message has been sent. If you are in immediate danger please call <a href=\"tel:911\">911</a> or the National Suicide Prevention hotline at <a href=\"tel:1-800-273-8255\">1-800-271-8255</a>.",
          html: true
        });
        return response;
      }).catch(function(err){
        console.log('Error getting data from server', err);
      });
    }

  });
