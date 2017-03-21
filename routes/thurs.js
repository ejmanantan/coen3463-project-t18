var express = require('express');
var router = express.Router();
var moment = require('moment');
var Thursday = require('../models/thurs');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Thursday.find( function(err, thurs, count) {
    res.render('thurs', {thurs: thurs, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Thursday({
name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, thursday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/thurs');
      }
    })
});

router.get('/add4', function(req, res) {
  res.render('add4', {thursday: {}});
});

router.route('/:thursday_id')
  .all(function(req, res, next) {
    thursday_id = req.params.thursday_id;
    thursday = {};
    Thursday.findById(thursday_id, function(err, c) {
      thursday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit4', {thursday: thursday, moment: moment});
  })



  .post(function(req, res) {
      thursday.name = req.body.name,
      thursday.sn = req.body.sn,
      thursday.email = req.body.email,
      thursday.room = req.body.room,
      thursday.stime = req.body.stime,
      thursday.etime = req.body.etime,
      thursday.purps = req.body.purps,
      thursday.date = req.body.date
      
    thursday.save(function(err, thursday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/thurs');
      }
    });
  })

 router.get('/:thursday_id/delete', function(req, res) {
       var thursday_id = req.params.thursday_id;
      Thursday.findByIdAndRemove(req.params.thursday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/thurs/')
            
        });
    });

module.exports = router;
