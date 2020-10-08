const io = require('socket.iO')(3000)
const user={}
io.on('connection', socket => {
   
    socket.on('new-user',name => {
        user[socket.id] = name
    socket.broadcast.emit(`user-connected`,name)
    })
    socket.on('send-chat-message',messageInput=>{
        socket.broadcast.emit('chat-message',{messageInput:messageInput , name:user[socket.id]})
    })
    socket.on('disconnect',() => {
        socket.broadcast.emit(`user-disconnected`,user[socket.id])
        delete user[socket.id] 
    
    })
})

