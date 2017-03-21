var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var db;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Us', user: req.user });
});


/*
router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});*/

router.post('/send', function(req,res,next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user: 'coen3463t18@gmail.com',
			pass: 'coen3463143'
		}
	});

	var mailOptions = {
		from: req.body.email,
		to: 'coen3463t18@gmail.com',
		subject: 'Room Reservation',
		text: 'Hi, my name is ' + req.body.fname + req.body.lname +
		' with a student number of' + req.body.sn + 
		', would like to reserve the room' + req.body.room + 
		' on ' + req.body.date + 
		' (' + req.body.day + ')' +
		' at '+ req.body.time + 
		' ' + req.body.message,
		
		html: '<p> You got a new message with the following details</p><ul><li> First Name: '+req.body.fname+
		'</li><li> Last Name: '+req.body.lname+
		'</li><li> Student Number: '+req.body.sn+
		'</li><li> Email: '+req.body.email+
		'</li><li> Room: '+req.body.room+ 
		'</li><li> Day: '+req.body.day+ 
		'</li><li> Date: '+req.body.date+ 
		'</li><li> Time: '+req.body.time+ 
		'</li><li> message: '+req.body.message +'</li></ul>'
	};
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message sent: ' +info.response);
			res.redirect('/');
		}
	});
});
module.exports = router;