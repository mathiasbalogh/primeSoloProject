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

router.use(bodyParser.urlencoded({extended: true}));

router.get('/:type:q', function (req, res) {
  console.log('this is the req params q', req.params.q);
  var type = req.params.type;
  var query = req.params.q;
  switch (type){
    case '1': //date
      console.log('case 1');
      query = new Date(query);
      var lessThan = new Date(query);
      lessThan.setDate(lessThan.getDate()+1);
      console.log(query);
      console.log(lessThan);
      Form.find({'userId':req.user.id, date: {'$gte':new Date(query), '$lt':new Date(lessThan)}}, function(err, forms){
        if(err){
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '2': //keyword
      console.log('case 2');
      Form.find({'userId':req.user.id, 'entry': {$regex: '/$'+query+'$/'}}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '3': //month
      console.log(req.params.q);
      var mo = req.params.q;
      switch(mo){
        case 'January'||'january':
        mo = 0;
        break;
        case 'February'||'february':
        mo = 1;
        break;
        case 'March'||'march':
        mo = 2;
        break;
        case 'April'||'april':
        mo = 3;
        break;
        case 'May'||'may':
        mo = 4;
        break;
        case 'June'||'june':
        mo = 5;
        break;
        case 'July'||'july':
        mo = 6;
        break;
        case 'August'||'august':
        mo = 7;
        break;
        case 'September'||'september':
        mo = 8;
        break;
        case 'October'||'october':
        mo = 9;
        break;
        case 'November'||'november':
        mo = 10;
        break;
        case 'December'||'december':
        mo = 11;
        break;
      }
      Form.find({'userId':req.user.id, 'month':mo}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '4': //rating
      console.log('case 4');
      Form.find({'userId':req.user.id, 'rating': req.params.q}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
    case '5': //timespan
      console.log(req.params.q);
      Form.find({'userId':req.user.id}, function(err, forms){
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send(forms);
      });
      break;
  }
  // Form.find({'userId':req.user.id}, function(err, forms){
  //   if(err){
  //     res.sendStatus(500);
  //     return;
  //   }
  //   res.send(forms);
  // });

});


module.exports = router;
