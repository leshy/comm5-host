_ = window._ = require('underscore')
$ = window.$ = require('jquery-browserify')
io = window.io = require('socket.io-browserify')
comm = window.comm = require 'comm/clientside'

socket = io.connect('http://localhost');

socket.on 'news', (data) ->
    console.log data
    socket.emit 'my other event', { my: 'data' }

        
$(document).ready ->
    $(document.body).append _.keys(comm).join ', '



