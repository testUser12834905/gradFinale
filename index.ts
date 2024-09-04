import { WebSocket, WebSocketServer } from "ws";

const isUserAuthenticated = (userID: string): boolean => true;

const globalChatHistory: Record<string, string>[] = [];

const processMessage = (message: { type: string }) => {
  switch (message.type) {
    case "ping":
      return "pong";
  }
};

function main() {
  const port = 8080;

  const wewSocketServer = new WebSocketServer({ port });

  const clients: Set<WebSocket> = new Set();

  function broadcast(message: string, sender: WebSocket) {
    clients.forEach((client) => {
      // if (client !== sender) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(globalChatHistory));
      }
      // }
    });
  }

  wewSocketServer.on("connection", (ws) => {
    console.log("New client connected");

    if (!isUserAuthenticated("123")) {
      ws.close();
      return;
    }

    clients.add(ws);
    ws.send(globalChatHistory);

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
      globalChatHistory.push(JSON.parse(message.toString()));
      broadcast(message.toString(), ws);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });
  });
}

main();
