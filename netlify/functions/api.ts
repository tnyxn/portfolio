import express from 'express';
import serverless from 'serverless-http';

import createError from 'http-errors';
import path from 'path';

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

// Refresh the browser on changes
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

var app = express();

// Refresh browser when Nodemon restarts ExpressJS server
app.use(connectLiveReload());

var dataFile = require('./data/data.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('appData', dataFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


export const handler = serverless(app);