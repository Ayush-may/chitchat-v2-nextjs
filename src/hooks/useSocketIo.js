import { useEffect, useRef } from "react";
import { io } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:8080';
const SOCKET_SERVER_URL = 'https://chatapi.ayushmay.me';

export function useSocketIo() {
 const socketRef = useRef(null);

 useEffect(() => {
  if (!socketRef.current) {
   socketRef.current = io(SOCKET_SERVER_URL);
  }

  socketRef.current.on('connect', () => {
   console.log('Connected to server');
  });

  return () => {
   if (socketRef.current) {
    socketRef.current.disconnect();
   }
  };
 }, []);

 return socketRef;
}