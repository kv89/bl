
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    blog = require('./routes/blog'),
    user = require('./routes/user');

var app = module.exports = express();


// Configuration
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// Blog
app.post('/api/blog/creatBlog', blog.createBlog);
app.get('/api/blog/getAllBlogs', blog.getAllBlogs);
app.post('/api/blog/like', blog.likeBlog);
app.post('/api/blog/delete', blog.deleteBlog);

// users
app.post('/api/user/signin', user.signin);




// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
app.listen(3333, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
