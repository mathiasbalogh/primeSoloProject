var express = require('express');
var router = express.Router();
var path = require('path');
var Form = require('../models/forms');
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

router.get('/chart', function (req, res) {
  Form.find({'userId':req.user.id}, function(err, forms){
    if(err){
      res.sendStatus(500);
      return;
    }
    res.send(forms);
  }).sort( { date: -1 } );
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
      var lt = queryArray[1].toLowerCase();
      var monthArray=['january','february','march','april','may','june','july','august','september','october','november','december'];
      gte = monthArray.indexOf(gte);
      lt = monthArray.indexOf(lt);
      Form.find({'userId':id, 'month': {'$gte': gte, '$lt': lt}}, function(err, forms){
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
