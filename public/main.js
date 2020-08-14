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


console.log('Afer seending request'); 
socket.on('user-ok',(usersConnected) => {
    loginPage.style.display = 'none'; 
    chatPage.style.display  = 'flex'; 
    textInput.focus(); 
    usersList = usersConnected; 
    renderUserList(); 
})


renderUsersList = function() 
{

}