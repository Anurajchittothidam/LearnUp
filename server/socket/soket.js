import {Server} from 'socket.io'

const io=new Server();

const socketApi={
    io:io
}

io.on('connection',(socket)=>{
    console.log('teacher connected')

    socket.on('disconnect',()=>{
        console.log('A teacher disconnected')
    })
})

export default socketApi;