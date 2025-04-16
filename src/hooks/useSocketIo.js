import { useEffect, useRef } from "react";
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'ws://localhost:8000';

export function useSocketIo() {
 const socketRef = useRef();

 useEffect(() => {
  socketRef.current = io(SOCKET_SERVER_URL);

  socketRef.current.on('connect', () => {
   alert('Connected to server');
  });

  return () => {
   socketRef.current.disconnect();
  };
 }, []);

 return socketRef;
}