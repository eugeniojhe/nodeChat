const socket = io();

let userName = '';
let usersList = {};

let loginPage = document.querySelector('#loginPage');
let chatPage = document.querySelector('#chatPage'); 

let loginInput = document.querySelector('#idNameLogin'); 
let textInput = document.querySelector('#chatTextInput'); 

loginPage.style.display = 'flex';

loginInput.addEventListener('keyup',(e) =>{
    if (e.keyCode === 13){
        let name = loginInput.value.trim();
        if (name != ''){
           userName  = name; 
           document.title = ' Chat ('+userName+')'; 
           socket.emit('joint-request',userName);
        }
    }
});

textInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13){
        let message = textInput.value.trim(); 
        textInput.value = ''; 
        if (message != ''){
            socket.emit('send-msg',message); 
        }
    }
})

socket.on('user-ok',(usersConnected) => {
    loginPage.style.display = 'none'; 
    chatPage.style.display  = 'flex'; 
    textInput.focus(); 
    renderUsersList( usersConnected); 
    addMessage('status', '', 'connected'); 
})

socket.on('list-update',(data) => {
    let list = data.list;  
    if (data.joined){
        addMessage('status','',data.joined+' Entrando no chat'); 
    }
    if (data.left){
        addMessage('status','',data.left+' Saindo do chat'); 
    }
    renderUsersList(list); 
});

socket.on('show-msg',(data) => {
    addMessage('msg',data.userName, data.message); 
});

socket.on('disconnect',() => {
    renderUsersList([]);
    addMessage('status', null, 'Você foi desconectado do chat'); 
});

socket.on('reconnect_error', () => {
    addMessage('status', null, 'Tentand reconectar'); 
})

socket.on('reconnect', () => {
    addMessage('status', null, 'Reconectado'); 
    if (userName != ''){
        socket.emit('join-request',userName); 
    }
})




renderUsersList = function(usersConnected) 
{
    let ul = document.querySelector('.usersList');
    ul.innerHTML = ''; 
    usersConnected.forEach(user => {
         ul.innerHTML += `<li>${user}</li>`
    });
   /*  usersConnected.map((data,index) =>{
        console.log('loop mapa '+data);        
        ul.querySelector('li').innerHTML = data; 
    }); */
}

addMessage = function(type, user, msg)
{
    let ul = document.querySelector('.chatList'); 
    switch(type){
        case 'status':
            ul.innerHTML += `<li class="m-status">${msg}</li>`; 
            break ;
        case 'msg':
            if (userName == user){
                ul.innerHTML += `<li class="m-txt"><span class="me">${user} </span>${msg}</li>`;
            }else {
                 ul.innerHTML += `<li class="m-txt"><span>${user} </span>${msg}</li>`;
            }
            break; 
        default:
            break;    
    }
    ul.scrollTop = ul.scrollHeight; 
}