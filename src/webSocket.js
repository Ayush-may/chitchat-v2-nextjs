// websocketServer.js

import { WebSocketServer } from 'ws';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';

const websocketServer = new WebSocketServer({ noServer: true });

const createWebSocketServer = (httpServer, schema) => {
  websocketServer.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  useServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => {
        console.log('Client connected to WebSocket');
      },
    },
    websocketServer
  );

  httpServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit('connection', ws, request);
    });
  });
};

export default createWebSocketServer;
