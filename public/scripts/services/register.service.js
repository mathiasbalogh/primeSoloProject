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
      console.log('Error updating data on server', err);
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
      console.log('Error updating data on server', err);
    });
  }

  this.removeContact = function(phone){
    return $http({
      method: 'DELETE',
      url:'/form/'+phone
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error deleting from server', err);
    });
  }

  this.submitUpdate = function(id, name, phone){
    return $http({
      method: 'PUT',
      url: '/form/contactUpdate',
      data:{
        _id: id,
        name: name,
        phone: phone
      }
    }).then(function(response){
      console.log('Success');
      return response;
    }).catch(function(err){
      console.log('Error updating data on server', err);
    });
  }

});
