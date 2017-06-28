var nedb = require("nedb"),
	_db = new nedb({ filename: './user.db', autoload: true });

//_db.insert({email: 'pchhetri97@gmail.com', password: new Buffer("password").toString('base64')});

exports.signin = function (req, res) {
  	_db.findOne({email: new Buffer(req.body.email, 'base64').toString()}, function(err, user) {
	  	console.log(' found user : ' , user._id);
		if( user && new Buffer(user.password, 'base64').toString() == new Buffer(req.body.password, 'base64').toString()) {
			res.send(true);
		} else {
			res.send(false);
		}
	});
};