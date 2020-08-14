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


socket.on('user-ok',(usersConnected) => {
    loginPage.style.display = 'none'; 
    chatPage.style.display  = 'flex'; 
    textInput.focus(); 
    renderUsersList( usersConnected); 
})

socket.on('list-update',(data) => {
    let list = data.list;  
    renderUsersList(list); 
});


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