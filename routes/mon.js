var express = require('express');
var router = express.Router();
var moment = require('moment');
var Monday = require('../models/mon');
var passport = require('passport');
var db;

router.use(function(req, res, next) {
  /*if (!req.user) {
    res.redirect('/auth/login')
  }*/
  next();
});

router.get('/', function(req, res) {
  Monday.find( function(err, mon, count) {
    res.render('mon', {mon: mon, user: req.user });
  })
});

router.post('/', function(req, res) {
    new Monday({
      name: req.body.name,
      sn: req.body.sn,
      email: req.body.email,
      room: req.body.room,
      stime: req.body.stime,
      etime: req.body.etime,
      purps: req.body.purps,
      date: req.body.date

    }).save(function(err, monday, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        console.log("Saving Data Successfull!");
        res.redirect('/mon');
      }
    })
});

router.get('/add1', function(req, res) {
  res.render('add1', {title: "Add a Monday Schedule"});
});

router.route('/:monday_id')
  .all(function(req, res, next) {
    monday_id = req.params.monday_id;
    monday = {};
    Monday.findById(monday_id, function(err, c) {
      monday = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit1', {monday: monday, moment: moment});
  })



  .post(function(req, res) {
      monday.name = req.body.name,
      monday.sn = req.body.sn,
      monday.email = req.body.email,
      monday.room = req.body.room,
      monday.stime = req.body.stime,
      monday.etime = req.body.etime,
      monday.purps = req.body.purps,
      monday.date = req.body.date

    monday.save(function(err, monday, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        console.log("updated!");
        res.redirect('/mon');
      }
    });
  })

 router.get('/:monday_id/delete', function(req, res) {
       var monday_id = req.params.monday_id;
      Monday.findByIdAndRemove(req.params.monday_id, function(err, food) {
            if(err){
            return console.log(err)
            }
            console.log("Deleting Data Successful!");
            res.redirect('/mon/')
            
        });
    });

module.exports = router;
