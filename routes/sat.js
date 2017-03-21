var express = require('express');
var router = express.Router();
var moment = require('moment');
var Saturday = require('../models/sat');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Saturday.find( function(err, sat, count) {
    res.render('sat', {sat: sat, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Saturday({
name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, saturday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/sat');
      }
    })
});

router.get('/add6', function(req, res) {
  res.render('add6', {saturday: {}});
});

router.route('/:saturday_id')
  .all(function(req, res, next) {
    saturday_id = req.params.saturday_id;
    saturday = {};
    Saturday.findById(saturday_id, function(err, c) {
      saturday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit6', {saturday: saturday, moment: moment});
  })



  .post(function(req, res) {
     saturday.name = req.body.name,
      saturday.sn = req.body.sn,
      saturday.email = req.body.email,
      saturday.room = req.body.room,
      saturday.stime = req.body.stime,
      saturday.etime = req.body.etime,
      saturday.purps = req.body.purps,
      saturday.date = req.body.date
      
    saturday.save(function(err, saturday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/sat');
      }
    });
  })

 router.get('/:saturday_id/delete', function(req, res) {
       var saturday_id = req.params.saturday_id;
      Saturday.findByIdAndRemove(req.params.saturday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/sat/')
            
        });
    });

module.exports = router;
