import React, { useState, useRef, useEffect } from "react";
import Display from "./Display";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

const WorldViewer = () => {
  const socketUrl = "ws://192.168.49.2/api";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);
  const zones = useRef<{ [id: string]: Zone }>({});

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      const newZoneData: { [key: string]: Zone } = JSON.parse(
        lastMessage?.data
      );
      Object.keys(newZoneData).forEach((key) => {
        const zoneId: keyof typeof zones.current = key;
        zones.current[zoneId] = newZoneData[key];
      });
    }
  }, [lastMessage]);

  return (
    <div>
      {zones.current["0"] ? (
        <Display zones={zones.current} connectionStatus={connectionStatus} />
      ) : (
        <p>{connectionStatus}...</p>
      )}
    </div>
  );
};

export default WorldViewer;
