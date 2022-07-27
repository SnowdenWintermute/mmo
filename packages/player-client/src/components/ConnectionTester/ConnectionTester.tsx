import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ConnectionTester = () => {
  const socketUrl = "ws://192.168.49.2/api";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    const messageTestLoop = () => {
      sendMessage("test message from player client");
      setTimeout(() => {
        messageTestLoop();
      }, 10000);
    };
    messageTestLoop();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ConnectionTester:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Connection Status:</td>
          <td>{connectionStatus}</td>
        </tr>
        {messageHistory.map((message: MessageEvent, i: number) => (
          <tr key={i}>
            <td>ID: {i}</td>
            <td>{message?.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConnectionTester;
