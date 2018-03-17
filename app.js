var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds129776.mlab.com:29776/sjsubot');
//mongoose.connect('mongodb://localhost:27017/sjsubot');
var db = mongoose.connection;
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user');

//Init App
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(__dirname + '/views')); // html
//app.use(express.static(__dirname + '/public')); // js, css, images

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//bodyparses middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'cmpe272bot',
	cookie: { maxAge : 3600000 } ,
	saveUninitialized: true,
	resave : true,
	store : new MongoStore({mongooseConnection : mongoose.connection})
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
	errorFormatter : function(param, msg, value){
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return{
			param : formParam,
			msg : msg,
			value : value
		};
	}

}));

//connect flash
app.use(flash());

//Global variables
var emailUser = null;
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	//for passport error
	res.locals.error = req.flash('error');
	//to access user from anywhere
	res.locals.user = req.user || null;
	if(req.session) {
	if(req.session.passport){
	emailUser = req.session.passport.user.email;
	console.log("User logged in is" + emailUser);
}
else {
	emailUser = "admin@sjsu.edu"
}
}
else {
emailUser = "admin@sjsu.edu";
}
	next();
});

app.use('/', routes);
app.use('/users', users);

//set port
app.set('port', (process.env.PORT || 3000));

const server = http.createServer(app).listen(app.get('port'));
// const server = app.listen(app.get('port'), function(){
// 		console.log('Server started on port ' + app.get('port'));
// });

const APIAI_TOKEN = '0bca16a37999442b809ef9570f7049e6 ';
const APIAI_SESSION_ID = 'ffcb8c2ed46e45e993e859d110b9d228';

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      var aiText = response.result.fulfillment.speech;

      var intent = response.result.metadata.intentName;
      console.log("intent name:" + intent);
			console.log("fetching username", emailUser);

			User.getStudentByEmail(emailUser, intent, function(err, user){
				if(intent === 'gpa')
				aiText = response.result.fulfillment.speech + " " + user.gpa;
			 if(intent === 'feesDue')
				 aiText = response.result.fulfillment.speech + " " + user.due_fees;
			if(intent === 'upcomingQuizzes')
				aiText = response.result.fulfillment.speech + " " + user.upcoming_quizzes;
				if(intent === 'dueAssignments')
				aiText = response.result.fulfillment.speech + " " + user.due_assignments;
			if(intent === 'creditEarned')
				aiText = response.result.fulfillment.speech + " " + user.credits;
			 if(intent === 'creditsRemaining')
				aiText = response.result.fulfillment.speech + " " + user.credits_remaining;
			if(intent === 'coursesCompleted')
				aiText = response.result.fulfillment.speech + " " + user.courses_completed;
			if(intent === 'coursesRemaining')
				aiText = response.result.fulfillment.speech + " " + user.courses_remaining;

			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'Unknown User'});
				}

			console.log("aiText is :" +  aiText);

			console.log('Bot reply: ' + aiText);
			socket.emit('bot reply', aiText);
		});

	});
    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
