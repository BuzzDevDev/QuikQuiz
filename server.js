const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

var port = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));

// use webpage file index.html in /public/
app.use(express.static(__dirname + '/public/'));

// event listener listening for a user to connect to server
io.on('connection', socket => {
    socket.emit('Console', 'Connected to server.');
});

server.listen(port);