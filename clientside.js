(function() {
  var $, comm, io, _;
  _ = window._ = require('underscore');
  $ = window.$ = require('jquery-browserify');
  io = window.io = require('socket.io-browserify');
  comm = window.comm = require('comm/clientside');
  $(document).ready(function() {
    var socket;
    $(document.body).append(_.keys(comm).join(', '));
    socket = new comm.WebsocketClient({
      realm: 'server'
    });
    return socket.connect('http://localhost:3333', function() {
      return console.log('connected');
    });
  });
}).call(this);
