var express = require('express');
var router = express.Router();
var path = require('path');
var Form = require('../models/forms');
var bodyParser = require('body-parser');




router.post('/', function (req, res) {
req.body.userId = req.user.id;
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

router.get('/:q', function (req, res) {
  console.log('this is the req params q', req.params.q);
  Form.find({'userId':req.user.id}, function(err, forms){
    if(err){
      res.sendStatus(500);
      return;
    }
    res.send(forms);
  });

});


module.exports = router;
