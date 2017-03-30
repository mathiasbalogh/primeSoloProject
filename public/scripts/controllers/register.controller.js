app.controller('RegisterController', function(RegisterService, DefaultService, $location, $route){
    console.log('RegisterController is loaded');

var reg = this;
reg.showP = true;

reg.goToHome = function(){
  $location.path('/home');
}

reg.updateContact = function(){
  console.log('updating contact');
  reg.showP = false;
  reg.showInput = true;
}

reg.submitUpdate = function(id, name, phone){
  RegisterService.submitUpdate(id, name, phone).then(function(res){
    console.log(res);
    reg.showP = true;
    reg.showInput = false;
  });
}

reg.getContactsAndMessage = function(){
  return DefaultService.checkRegistration().then(function(res){
    var user = res[0];
    reg.contactsArray = user.emergency;
    reg.message = user.message;
    reg.contactsArray.forEach(function(i){
      i.phone = i.phone.slice(2,i.phone.length);
      i.phone = Number(i.phone);
    });
  });
}

reg.getContactsAndMessage();

reg.removeContact = function(contactPhone){
  RegisterService.removeContact(contactPhone).then(function(){
    console.log('success');
    reg.getContactsAndMessage();
  });
}

reg.checkRegistration = function(){ //checks if user if fully registered
  return DefaultService.checkRegistration().then(function(res){
    var user = res[0];
    var nullCheck = false;
    var contactArray = user.emergency;
    var message = user.message;
    console.log(contactArray);
    if(contactArray == null){
      return {'registered': nullCheck, 'contacts': contactArray, 'message': message};
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
      nullCheck = false;
      return {'registered': nullCheck, 'contacts': contactArray, 'message': message};
    }else {
      nullCheck = true;
      return {'registered': nullCheck, 'contacts': contactArray, 'message': message};
    }
    return {'registered': nullCheck, 'contacts': contactArray, 'message': message};
  });

}

reg.newUser = function(){
  reg.checkRegistration().then(function(res){
    console.log(res);
    if (res.contacts.length == 0 && res.message == null){
      swal('Welcome to Mind;Space', 'To begin, please designate at least one Emergency Contact, and an Emergency Message.');
    }
  });
}

reg.newUser();

reg.submitContact = function(contactName, contactPhone){
  RegisterService.submitContact(contactName, contactPhone).then(function(){
    console.log('success');
      reg.checkRegistration().then(function(res){
      if(res.registered == true){
        $location.path('/home');
        swal('Your Info Was Saved!', 'Let us know how you feel with Today\'s Mood', 'success');
      }else {
        console.log('try again');
        $route.reload();
        swal('Contact Saved!', 'To continue, please submit an Emergency Message', 'success');
      }
    });
  });
}

reg.submitMessage = function(emergencyMessage){
  RegisterService.submitMessage(emergencyMessage).then(function(){
    console.log('success');
      reg.checkRegistration().then(function(res){
      if(res.registered == true){
        $location.path('/home');
        swal('Your Info Was Saved!', 'Let us know how you feel with Today\'s Mood', 'success');
      }else {
        console.log('try again');
        $route.reload();
        swal('Emergency Message Saved!', 'To continue, please submit an Emergency Contact', 'success');
      }
    });
  });
}




});
