app.service('RegisterService', function ($http) {

  this.submitContact = function(contactName, contactPhone){
    return $http({
      method: 'PUT',
      url: '/form/user',
      data:{
        name: contactName,
        phone: contactPhone
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error getting data from server', err);
    });
  }

  this.submitMessage = function(emergencyMessage){
    return $http({
      method: 'PUT',
      url: '/form/usermessage',
      data:{
        message: emergencyMessage
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error getting data from server', err);
    });
  }

});
