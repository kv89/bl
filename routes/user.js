var lowdb = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async')
var db = lowdb('db.json', {storage: fileAsync});

// db.defaults({users : [{email: 'pchhetri97@gmail.com', password: new Buffer('password').toString('base64')}]}).write();
// db.get('users').push({email : 'pchhetri97@gmail.com', password: 'cGFzc3dvcmQ='}).write();

exports.signin = function (req, res) {
  	console.log('req --- > ',req.body, '  --  ', new Buffer(req.body.email, 'base64').toString());
  	const user = db.get('users')
	    .find({email: new Buffer(req.body.email, 'base64').toString()}).value();
	    console.log(' found user : ' , user);
	if( user && new Buffer(user.password, 'base64').toString() == new Buffer(req.body.password, 'base64').toString()) {
		res.send(true);
	} else {
		res.send(false);
	}
};