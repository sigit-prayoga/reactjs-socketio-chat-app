var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user has connected');
  socket.on('disconnect', function(){
    console.log('DISCONNECTED');
  });
  socket.on('onChatSent', function(msg){
    console.log('The message is: '+msg);
    socket.broadcast.emit('onChatReceived', msg);
  });
  socket.on('onTyping', function(onTyping, username){
    console.log('onTyping: '+onTyping + " "+username);
    socket.broadcast.emit('onTyping', onTyping, username);
  });
});

http.listen(3000, function(){
  console.log('I"m listening to port 3000');
});
