var express = require('express');
var router = express.Router();
var moment = require('moment');
var Friday = require('../models/fri');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Friday.find( function(err, fri, count) {
    res.render('fri', {fri: fri, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Friday({
name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, friday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/fri');
      }
    })
});

router.get('/add5', function(req, res) {
  res.render('add5', {friday: {}});
});

router.route('/:friday_id')
  .all(function(req, res, next) {
    friday_id = req.params.friday_id;
    friday = {};
    Friday.findById(friday_id, function(err, c) {
      friday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit5', {friday: friday, moment: moment});
  })



  .post(function(req, res) {
      friday.name = req.body.name,
      friday.sn = req.body.sn,
      friday.email = req.body.email,
      friday.room = req.body.room,
      friday.stime = req.body.stime,
      friday.etime = req.body.etime,
      friday.purps = req.body.purps,
      friday.date = req.body.date
      
    friday.save(function(err, friday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/fri');
      }
    });
  })

 router.get('/:friday_id/delete', function(req, res) {
       var friday_id = req.params.friday_id;
      Friday.findByIdAndRemove(req.params.friday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/fri/')
            
        });
    });

module.exports = router;
