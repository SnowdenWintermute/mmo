// import axios from "axios";

// const testAxios = async () => {
//   setInterval(async () => {
//     console.log("trying axios");
//     const res = await axios.get("http://zone-node-cluster-ip-service:5001");
//     console.log(res.data);
//   }, 3000);
// };

// testAxios();

import { WebSocket } from "ws";
const WS_ADDRESS = "ws://zone-node-cluster-ip-service:5001";

const handleSocketConnection = (address: string) => {
  const ws = new WebSocket(address);
  let pingTimeout: NodeJS.Timeout;
  ws.onopen = (event: any) => {
    console.log("connected to zone node");
    const pingServer = () => {
      clearTimeout(pingTimeout);
      pingTimeout = setTimeout(() => {
        console.log("pinging...");
        ws.send("some text");
        pingServer();
      }, 3000);
    };
    pingServer();
  };
  ws.onerror = (error) => {
    console.log(error);
  };
  ws.onclose = (e) => {
    clearTimeout(pingTimeout);
    console.log("connection terminated, reconnecting...");
    setTimeout(() => handleSocketConnection(WS_ADDRESS), 3000);
  };
};

handleSocketConnection(WS_ADDRESS);
