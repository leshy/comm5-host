(function() {
  var $, comm, io, socket, _;
  _ = window._ = require('underscore');
  $ = window.$ = require('jquery-browserify');
  io = window.io = require('socket.io-browserify');
  comm = window.comm = require('comm/clientside');
  socket = io.connect('http://localhost');
  socket.on('news', function(data) {
    console.log(data);
    return socket.emit('my other event', {
      my: 'data'
    });
  });
  $(document).ready(function() {
    return $(document.body).append(_.keys(comm).join(', '));
  });
}).call(this);
