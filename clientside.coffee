_ = window._ = require('underscore')
$ = window.$ = require('jquery-browserify')
io = window.io = require('socket.io-browserify')
Backbone = window.Backbone = require('backbone')

comm = window.comm = require 'comm/clientside'

$(document).ready ->
    body = $(document.body)
    body.append "comm5: " + _.keys(comm).join ', '

    socket = new comm.WebsocketClient { realm: 'server' }
    socket.pass()
    socket.connect 'http://localhost:3333', -> console.log 'connected'

    collection = window.collection = new comm.RemoteCollection { name: 'test' }
    collection.connect(socket)

    collection.defineModel 'default model', {}
    collection.defineModel 'bla2', { k: "HAHEHAA" }

    # query the db once you get a hello message from the server
    socket.subscribe { hello: true }, (msg,reply,next,transmit) ->
        reply.end()

        collection.findModels {}, {}, (element) ->
            if element then body.append JSON.stringify(element) + "<br>"; window.m = element
    
    body.append "<br><br>"

