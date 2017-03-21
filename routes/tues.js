var express = require('express');
var router = express.Router();
var moment = require('moment');
var Tuesday = require('../models/tues');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Tuesday.find( function(err, tues, count) {
    res.render('tues', {tues: tues, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Tuesday({
name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, tuesday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/tues');
      }
    })
});

router.get('/add2', function(req, res) {
  res.render('add2', {tuesday: {}});
});

router.route('/:tuesday_id')
  .all(function(req, res, next) {
    tuesday_id = req.params.tuesday_id;
    tuesday = {};
    Tuesday.findById(tuesday_id, function(err, c) {
      tuesday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit2', {tuesday: tuesday, moment: moment});
  })



  .post(function(req, res) {
      tuesday.name = req.body.name,
      tuesday.sn = req.body.sn,
      tuesday.email = req.body.email,
      tuesday.room = req.body.room,
      tuesday.stime = req.body.stime,
      tuesday.etime = req.body.etime,
      tuesday.purps = req.body.purps,
      tuesday.date = req.body.date
      
    tuesday.save(function(err, tuesday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/tues');
      }
    });
  })

 router.get('/:tuesday_id/delete', function(req, res) {
       var tuesday_id = req.params.tuesday_id;
      Tuesday.findByIdAndRemove(req.params.tuesday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/tues/')
            
        });
    });

module.exports = router;
