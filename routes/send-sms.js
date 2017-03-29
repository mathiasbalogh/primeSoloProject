var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

 // Twilio Credentials
var accountSid = 'AC1dc79a3af9061aff9742d9f031531e59';
var authToken = 'b07f6511160f0a0f13aecb1de2586b24';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

router.get('/user', function (req, res) { //pull user info
  var emergencyContactArray = req.user.emergency;
  emergencyContactArray.forEach(function(i){
    client.messages.create({
        to: i.phone,
        from: "+16088566092",
        body: "This is "+req.user.googleName+". "+req.user.message,
    }, function(err, message) {
        if(message){
          console.log(message.sid);
        }else{
          console.log(err);
          res.sendStatus(500);
        }
    });
  });
  res.sendStatus(204);
});



// client.messages.create({
//     to: "+16084810238",
//     from: "+16088566092",
//     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
// }, function(err, message) {
//     console.log(message.sid);
// });


module.exports = router;
