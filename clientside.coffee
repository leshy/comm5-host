_ = window._ = require('underscore')
$ = window.$ = require('jquery-browserify')
io = window.io = require('socket.io-browserify')
comm = window.comm = require 'comm/clientside'

$(document).ready ->
    $(document.body).append _.keys(comm).join ', '
    socket = new comm.WebsocketClient { realm: 'server' }
    socket.connect 'http://localhost:3333', -> console.log 'connected'


