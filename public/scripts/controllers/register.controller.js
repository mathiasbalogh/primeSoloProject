app.controller('RegisterController', function(RegisterService, DefaultService, $location){
    console.log('RegisterController is loaded');

var reg = this;

reg.removeContact = function(contactPhone){
  RegisterService.removeContact(contactPhone).then(function(){
    console.log('success');
  });
}

reg.getContactsAndMessage = function(){
  return DefaultService.checkRegistration().then(function(res){
    var user = res[0];
    reg.contactsArray = user.emergency;
    reg.message = user.message;
  });
}

reg.getContactsAndMessage();

reg.checkRegistration = function(){ //checks if user if fully registered
  return DefaultService.checkRegistration().then(function(res){
    var user = res[0];
    var nullCheck = false;
    var contactArray = user.emergency;
    console.log(contactArray);
    if(contactArray == null){
      return nullCheck;
    }else{
      contactArray.forEach(function(i){
        if(i.name == null || i.phone == null){
          nullCheck = false;
        }else{
          nullCheck = true;
        }
      });
    }
    if(user.message == null || nullCheck == false){
      return nullCheck;
    }else {
      nullCheck = true;
      return nullCheck;
    }
    return nullCheck;
  });

}

reg.submitContact = function(contactName, contactPhone){
  RegisterService.submitContact(contactName, contactPhone).then(function(){
    console.log('success');
      reg.checkRegistration().then(function(res){
      if(res == true){
        $location.path('/home');
      }else {
        console.log('try again');
      }
    });
  });
}

reg.submitMessage = function(emergencyMessage){
  RegisterService.submitMessage(emergencyMessage).then(function(){
    console.log('success');
      reg.checkRegistration().then(function(res){
      if(res == true){
        $location.path('/home');
      }else {
        console.log('try again');
      }
    });
  });
}




});
