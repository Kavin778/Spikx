import { use } from 'react';
import { io } from 'socket.io-client';
import { getAccessToken } from './AuthService';

class SocketService {
  socket;

  connect(url) {
    if (!this.socket) {
        const token = getAccessToken();
      this.socket = io(url, {
        autoConnect: true,
        withCredentials: true,
        auth:{
            token:token
        }
      });

      this.socket.on('connect', () => {
        console.log(`Connected to the socket server:${this.socket.id}`);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId, username) {
    if (this.socket) {
      this.socket.emit('join_room', { roomId, username });
      console.log(`Joining Room ${roomId} as ${username}`);
    }
  }

  sendMessage(message, username) {
    console.log(username)
    this.socket?.emit('send_message', { message,username });
  }

  hostPlay(roomId, currentTime) {
    if (this.socket) {
      this.socket.emit('host_play', {
        roomId,
        currentTime,
      });
    }
  }

  hostPause(roomId, currentTime) {
    if (this.socket) {
      this.socket.emit('host_pause', {
        roomId,
        currentTime,
      });
    }
  }

  hostSeek(roomId, currentTime) {
    if (this.socket) {
      this.socket.emit('host_seek', {
        roomId,
        currentTime,
      });
    }
  }

  onSyncPlayback(callback) {
    if (this.socket) {
      this.socket.on('sync_playback', callback);
    }
  }

  onReceiveMessage(callback) {
    console.log(callback)
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  onUserJoined(callback) {
    if (this.socket) {
      this.socket.on('user_joined', callback);
    }
  }

  onUserLeft(callback){
    if(this.socket){
        this.socket.on('user_left',callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;