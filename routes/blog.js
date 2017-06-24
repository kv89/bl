/*
 * Serve JSON to our AngularJS client
 */
var lowdb = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async')
var db = lowdb('db.json', {storage: fileAsync});

// var blogs = db.get('blogs');
db.defaults({blogs : []}).write();

exports.createBlog = function (req, res) {
  	console.log('req --- > ',req.body);
  	db.get('blogs')
	    .push(req.body)
	    .last()
	    .assign({ id: Date.now() })
	    .write()
	    .then(function(blog){
	    	res.send(blog);
	    })
};

exports.getAllBlogs = function(req, res){
	const blogS = db.get('blogs').value();
	res.send(blogS.reverse());
}