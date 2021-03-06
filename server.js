const express = require('express');
const path = require('path'); 
const http = require('http'); 
const socketIO = require('socket.io'); 

connectedUsers = []; 
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
        connectedUsers.push( userName ); 
        socket.emit('user-ok',connectedUsers);
        
        socket.broadcast.emit('list-update',{
            joined:socket.userName,
            list:connectedUsers,
        });
    }); 

    socket.on('disconnect',() => {

        connectedUsers = connectedUsers.filter(u => u != socket.userName);
        socket.broadcast.emit('list-update',{
            left:socket.userName, 
            list:connectedUsers, 
        });
    });
    socket.on('send-msg', (txt) => {
        let obj = {
            userName: socket.userName, 
            message: txt, 
        };
        socket.emit('show-msg',obj); 
        socket.broadcast.emit('show-msg',obj); 
    })
}); 

app.use(express.static(path.join(__dirname,'public'))); 