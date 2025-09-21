
export default function socketHandler(io) {

    const roomStates = {};

    io.on('connection', (socket) =>{
        console.log('New client connected:', socket.id);

        socket.on('join_room',({roomId,username})=>{
            socket.roomId = roomId;
            socket.username = username;
            socket.join(roomId);
            console.log(`${username} joined room: ${roomId}`);

            socket.to(roomId).emit('user_joined',{
                message: `${username} has joined the room.`,
            })

            if(roomStates[roomId]){
                socket.emit('sync_playback', roomStates[roomId]);
            }
        })

        socket.on('send_message', (data)=>{
            const messagePayload = {
                message : data.message,
                username: data.username,
                timestamp: new CurrentTime().toLocaleTimeString(),
            }
            io.to(roomId).emit('receive_message',messagePayload);
        });

        socket.on('host_play',(data)=>{
            roomStates[data.roomId] = {state:'playing',time:data.currenttime};
            socket.to(data.roomId).emit('sync_playback',data.currenttime);
        })

        socket.on('host_pause',(data)=>{
            roomStates[data.roomId] = {state:'paused',time:data.currenttime};
            socket.to(data.roomId).emit('sync_playback',data.currenttime);
        })

        socket.on('host_seek',(data)=>{
            if(roomStates[data.roomId]){
                roomStates[data.roomId].time = data.currenttime;
            }

            socket.to(data.roomId).emit('sync_playback',data.currenttime);
        })

        socket.on('disconnect',()=>{
            console.log('Client disconnected:', socket.id);
            if(socket.roomId && socket.username){
                socket.to(socket.roomId).emit('user_left',{
                    message: `${socket.username} has left the room.`,
                })
            }
        })
    })
}