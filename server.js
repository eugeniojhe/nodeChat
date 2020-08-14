const express = require('express');
const path = require('path'); 
const http = require('http'); 
const socketIO = require('socket.io'); 

//Creating a server 
const app = express(); 
const server = http.createServer(app);
const io = socketIO(server);  
server.listen(3000);

//Declaring listener 
io.on('connection', (socket) => {
    console.log(' Connected Socket'); 
    socket.on('joint-request', (userName) => {
        socket.userName = userName; 
        connectedUser.push( userName ); 
        console.log(connectedUsers); 
        socket.emit('user-ok',connectedUsers); 
    }); 
}); 

app.use(express.static(path.join(__dirname,'public'))); 