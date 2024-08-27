import { WebSocket, WebSocketServer } from "ws";

function main() {
  const port = 8080;

  const wewSocketServer = new WebSocketServer({ port });

  const clients: Set<WebSocket> = new Set();

  function broadcast(message: string, sender: WebSocket) {
    clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  wewSocketServer.on("connection", (ws) => {
    console.log("New client connected");
    clients.add(ws);

    ws.send("Welcome to the chat!");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
      broadcast(message.toString(), ws);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });
  });
}

main();
