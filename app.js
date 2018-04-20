var express = require('express'),
session = require('express-session'),
path = require('path'),
favicon = require('serve-favicon'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
_ = require('lodash'),

users = require('./routes/users'),
login = require('./routes/login'),
logout = require('./routes/logout'),
dashboard = require('./routes/dashboard'),
healthInsurances = require('./routes/health-insurances'),
patients = require('./routes/patients'),
appointments = require('./routes/appointments');
userServices = require('./services/users'),
isAdmin = require('./config/roles'),
sequelize = require('./config/database-connection-config'),
app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge:  1800000
  },
  name: 'id'
  }
));

app.use('/dashboard/users', function restrict(req, res, next) {
  var role = req.session.userRole;
  if (!_.isUndefined(role)) {
    if(isAdmin(role)) {
      next();
    } else {
      return res.status(403).send({
        success: false,
        message: 'No tiene permisos para acceder a esta sección.'
      });
    }
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

app.use('/dashboard', function restrict(req, res, next) {
  var token = req.session.userId;
  if (token) {
    next();
  }
  else {
    return res.status(401).send({
      success: false,
      message: 'No esta en sesión'
    });
  }
});

app.use('/dashboard/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dashboard', dashboard);
app.use('/dashboard/patients', patients);
app.use('/dashboard/health-insurances', healthInsurances);
app.use('/dashboard/appointments', appointments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
