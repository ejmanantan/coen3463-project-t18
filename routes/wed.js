var express = require('express');
var router = express.Router();
var moment = require('moment');
var Wednesday = require('../models/wed');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Wednesday.find( function(err, wed, count) {
    res.render('wed', {wed: wed, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Wednesday({
name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, wednesday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/wed');
      }
    })
});

router.get('/add3', function(req, res) {
  res.render('add3', {wednesday: {}});
});

router.route('/:wednesday_id')
  .all(function(req, res, next) {
    wednesday_id = req.params.wednesday_id;
    wednesday = {};
    Wednesday.findById(wednesday_id, function(err, c) {
      wednesday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit3', {wednesday: wednesday, moment: moment});
  })



  .post(function(req, res) {
      wednesday.name = req.body.name,
      wednesday.sn = req.body.sn,
      wednesday.email = req.body.email,
      wednesday.room = req.body.room,
      wednesday.stime = req.body.stime,
      wednesday.etime = req.body.etime,
      wednesday.purps = req.body.purps,
      wednesday.date = req.body.date
      
    wednesday.save(function(err, wednesday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/wed');
      }
    });
  })

 router.get('/:wednesday_id/delete', function(req, res) {
       var wednesday_id = req.params.wednesday_id;
      Wednesday.findByIdAndRemove(req.params.wednesday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/wed/')
            
        });
    });

module.exports = router;
