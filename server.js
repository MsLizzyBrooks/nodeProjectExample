var express = require ('express'); 

const PORT = process.env.PORT || 3000;
var app = express(); 
var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));


app.use(express.static('public'));

console.log("my socket server is running");

var socket = require ('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection ' + socket.id);

    socket.on('mouse', mouseMsg);
    socket.on('key',keyMsg)

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data)
    }

    function keyMsg(words){
        socket.broadcast.emit('key',words);
        console.log(words)
    }
}