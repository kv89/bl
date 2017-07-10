/*
 * Serve JSON to our AngularJS client
 */
// var lowdb = require('lowdb');
// const fileAsync = require('lowdb/lib/storages/file-async')
// var db = lowdb('db.json', {storage: fileAsync});

// var blogs = db.get('blogs');
//db.defaults({blogs : []}).write();
var nedb = require("nedb"),
	_db = new nedb({ filename: './mydb.db', autoload: true });

_db.loadDatabase();

exports.createBlog = function (req, res) {
  	console.log('req --- > ',req.body);
  	_db.insert(req.body, function(err, newDoc){
		console.log("blog with id : " + newDoc._id + " created : " + newDoc.header);
		res.send(newDoc._id);
	});
};

exports.getAllBlogs = function(req, res){
	// const blogS = db.get('blogs').value();
	_db.find({}, function(err, blogS){
		res.send(blogS.reverse());
	});
	// res.send(blogS.reverse());
}

exports.likeBlog = function(req, res){
	// console.log(req.body);
	
	_db.update({_id: req.body._id}, { $set: { likes: req.body.likes }, $push: { likeStats: req.body.location} }, {upsert: true}, function(doc, numRep, upsert){
		// console.log("liked !!", doc, numRep, upsert);
		_db.findOne({_id: req.body._id}, function(err ,doc){
			res.send({_id: doc._id, likes: doc.likes});
		});		
	});

	
}

/////////////////////  ==================