const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer= document.getElementById('message-container')

const message = document.getElementById('message-input')
const name = prompt('Name please :-)')
appendMessage(`You Joined`)
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}:${data.messageInput}`);
})

socket.on('user-connected', name => {
    appendMessage(`${name} Connected`);
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} Disconnected`);
})


messageForm.addEventListener('submit', obj=>{
    obj.preventDefault();
    const messageInput = message.value
    appendMessage(`You:${messageInput}`)
    socket.emit('send-chat-message',messageInput)
    message.value=''

})

function appendMessage(messageInput){
    const messageElement = document.createElement('div')
    messageElement.innerText=messageInput
    messageContainer.append(messageElement)
}