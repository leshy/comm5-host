mongoserver = "localhost"
mongoport = 27017
mongodbname = "test"
name = "commhost"

_ = require("underscore")
express = require('express');
app = module.exports = express.createServer();
sys = require('sys');
mongo = require('mongodb');
BSON = mongo.BSONPure
io = require('socket.io')

comm = require('comm/serverside')

# configuration
app.configure -> 
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/static'))


# mongodb 
db = new mongo.Db(mongodbname,new mongo.Server(mongoserver,mongoport, {}), {});

db.open (err) ->
    if err then console.log("mongodb connection failed: " + err.stack )
    console.log("connected to mongodb server")

# Routes
app.post '*', (req, res, next) -> 
    console.log " - " + req.method + " " + req.url + " "
    next()

app.get '*', (req, res, next) -> 
    console.log " - " + req.method + " " + req.url + " "
    next()

app.get '/', (req, res) -> res.render( 'index', { title: name } )


app.listen 3333

# socketio
#socket = io.listen(app);

#socket.on 'connection', (socket) -> console.log('got connection')

ws = new comm.WebsocketServer { realm: 'web', express: app }
ws.listen (client) ->
    console.log('got client')
    
    client.subscribe true, (msg,reply,next,transmit) ->
        console.log "GOT",msg
        reply.end()
        
    client.msg { hello: 'there' }