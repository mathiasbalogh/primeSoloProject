app.controller('RegisterController', function(RegisterService, DefaultService, $location){
    console.log('RegisterController is loaded');

var reg = this;

reg.getContactsAndMessage = function(){

}

reg.checkRegistration = function(){
  return DefaultService.checkRegistration().then(function(res){
    var user = res[0];
    var nullCheck = false;
    contactArray = user.emergency.contacts
    console.log(contactArray);
    contactArray.forEach(function(i){
      console.log(i.name, i.phoneNumber);
      if(i.name == null || i.phoneNumber == null){
        nullCheck = false;
      }else{
        nullCheck = true;
      }
    });
    console.log(user.emergency.message);
    if(user.emergency.message == null || nullCheck == false){
      console.log(user);
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
        console.log(res);
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
        console.log(res);
      if(res == true){
        $location.path('/home');
      }else {
        console.log('try again');
      }
    });
  });
}



});
