(function() {
  var $, Backbone, comm, io, _;
  _ = window._ = require('underscore');
  $ = window.$ = require('jquery-browserify');
  io = window.io = require('socket.io-browserify');
  Backbone = window.Backbone = require('backbone');
  comm = window.comm = require('comm/clientside');
  $(document).ready(function() {
    var body, collection, socket;
    body = $(document.body);
    body.append("comm5: " + _.keys(comm).join(', '));
    socket = new comm.WebsocketClient({
      realm: 'server'
    });
    collection = window.collection = new comm.RemoteCollection({
      name: 'test'
    });
    collection.connect(socket);
    collection.defineModel('test', {});
    socket.connect('http://localhost:3333', function() {
      return console.log('connected');
    });
    socket.subscribe(true, function(msg, reply, next, transmit) {
      reply.end();
      transmit();
      return next();
    });
    socket.subscribe({
      hello: true
    }, function(msg, reply, next, transmit) {
      reply.end();
      return collection.findModels({}, {}, function(element) {
        if (element) {
          body.append(JSON.stringify(element) + "<br>");
          return window.m = element;
        }
      });
    });
    return body.append("<br><br>");
  });
}).call(this);
