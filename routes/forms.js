var express = require('express');
var router = express.Router();
var path = require('path');
var Form = require('../models/forms');
var User = require('../models/user');
var bodyParser = require('body-parser');



router.post('/', function (req, res) {
req.body.userId = req.user.id;
req.body.date = (new Date).toISOString().substr(0,10);
  var form = new Form(req.body);
  form.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log('created');
    res.sendStatus(201);//created
  });
});

router.get('/chart', function (req, res) { //pull form info for chart
  Form.find({'userId':req.user.id}, function(err, forms){
    if(err){
      res.sendStatus(500);
      return;
    }
    res.send(forms);
  }).sort( { date: -1 } );
});

router.get('/user', function (req, res) { //pull user info to check if registration fields are complete
  User.find({_id:req.user.id}, function(err, user){
    if(err){
      res.sendStatus(500);
      return;
    }
    res.send(user);
  });
});

router.put('/user', function (req, res) { //add first emergency contact
  console.log(req.body);
  User.update({_id:req.user.id},{$set:{"emergency.contacts.0.name": req.body.name, "emergency.contacts.0.phoneNumber": req.body.phone}}, function(err){
    if(err){
      res.sendStatus(500);
      return;
    }
    console.log('updated');
    res.sendStatus(204);
  });
});

router.put('/usermessage', function (req, res) { //add emergency message
  console.log(req.body);
  User.update({_id:req.user.id},{$set:{"emergency.message": req.body.message}}, function(err){
    if(err){
      res.sendStatus(500);
      return;
    }
    console.log('updated');
    res.sendStatus(204);
  });
});

router.use(bodyParser.urlencoded({extended: true}));

router.get('/:type:q', function (req, res) {
  console.log('this is the req params q', req.params.q);
  var type = req.params.type;
  var query = req.params.q;
  var id = req.user.id;
  switch (type){
    case '1': //search by date
      console.log('case 1');
      query = new Date(query);
      var lessThan = new Date(query);
      lessThan.setDate(lessThan.getDate()+1);
      Form.find({'userId':id, date: {'$gte':new Date(query), '$lt':new Date(lessThan)}}, function(err, forms){
        if(err){
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '2': //search by keyword
      console.log('case 2');
      Form.find({'userId':id, entry: {$regex: query}}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '3': //search by month
      var mo = query;
      month = mo.toLowerCase();
      var monthArray=['january','february','march','april','may','june','july','august','september','october','november','december'];
      mo = monthArray.indexOf(month);
      Form.find({'userId':id, 'month':mo}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '4': //search by rating
      console.log('case 4');
      Form.find({'userId':id, 'rating': query}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '5': //search by timespan
      var q = query;
      var queryArray = q.split('-');
      var gte = queryArray[0].toLowerCase();
      var lte = queryArray[1].toLowerCase();
      var monthArray=['january','february','march','april','may','june','july','august','september','october','november','december'];
      gte = monthArray.indexOf(gte);
      lte = monthArray.indexOf(lt);
      Form.find({'userId':id, 'month': {'$gte': gte, '$lte': lte}}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    }
  });






module.exports = router;
