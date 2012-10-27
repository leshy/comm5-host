(function() {
  var BSON, app, comm, db, express, io, mongo, mongodbname, mongoport, mongoserver, name, sys, testcollection, ws, _;
  mongoserver = "localhost";
  mongoport = 27017;
  mongodbname = "testdb";
  name = "commhost";
  _ = require("underscore");
  express = require('express');
  app = module.exports = express.createServer();
  sys = require('sys');
  mongo = require('mongodb');
  BSON = mongo.BSONPure;
  io = require('socket.io');
  comm = require('comm/serverside');
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static(__dirname + '/static'));
  });
  db = new mongo.Db(mongodbname, new mongo.Server(mongoserver, mongoport, {}), {});
  db.open(function(err) {
    if (err) {
      console.log("mongodb connection failed: " + err.stack);
    }
    return console.log("connected to mongodb server");
  });
  app.post('*', function(req, res, next) {
    console.log(" - " + req.method + " " + req.url + " ");
    return next();
  });
  app.get('*', function(req, res, next) {
    console.log(" - " + req.method + " " + req.url + " ");
    return next();
  });
  app.get('/', function(req, res) {
    return res.render('index', {
      title: name
    });
  });
  app.listen(3333);
  console.log(_.keys(comm).join(', '));
  testcollection = new comm.MongoCollectionNode({
    db: db,
    collection: 'test'
  });
  ws = new comm.WebsocketServer({
    realm: 'web',
    express: app
  });
  ws.connect(testcollection);
  ws.subscribe(true, function(msg, reply, next, transmit) {
    console.log("GOT", msg);
    reply.end();
    return transmit();
  });
  ws.listen(function(client) {
    console.log('got client');
    return client.msg({
      hello: 'there'
    });
  });
}).call(this);
