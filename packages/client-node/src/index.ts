import { WebSocket } from "ws";

const handleSocketConnection = (ws: WebSocket) =>
  ws.addEventListener("open", (event: any) => {
    console.log("connected to zone node");
    const pingServer = () => {
      setTimeout(() => {
        console.log("pinging...");
        ws.send("hello from client");
        pingServer();
      }, 1000);
    };
    pingServer();
    ws.send("whatup");
    ws.onclose = (e) => {
      console.log("connection terminated, reconnecting...");
      setTimeout(
        () => handleSocketConnection(new WebSocket("ws://localhost:5001")),
        1000
      );
    };
  });

handleSocketConnection(new WebSocket("ws://localhost:5001"));
