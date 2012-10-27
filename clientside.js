(function() {
  var $, comm, io, _;
  _ = window._ = require('underscore');
  $ = window.$ = require('jquery-browserify');
  io = window.io = require('socket.io-browserify');
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
      return collection.find({}, {}, function(element) {
        console.log('element', element);
        return body.append(JSON.stringify(element) + "<br>");
      });
    });
    return body.append("<br><br>");
  });
}).call(this);
