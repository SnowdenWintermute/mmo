import React, { useState, useRef, useEffect } from "react";
import Display from "./Display";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Zone } from "../../../game";
import { unpackEntities } from "../../../messages";

const WorldViewer = () => {
  const socketUrl = "ws://192.168.49.2/api";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
  });
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
      const newZoneData: { [key: string]: Zone } = JSON.parse(lastMessage?.data);
      Object.keys(newZoneData).forEach((key) => {
        const zoneId: keyof typeof zones.current = key;
        newZoneData[key].entities.agents = unpackEntities(newZoneData[key].entities.agents);
        for (const zoneId in newZoneData[key].entities.edge)
          newZoneData[key].entities.edge[zoneId] = unpackEntities(newZoneData[key].entities.edge[zoneId]);
        zones.current[zoneId] = newZoneData[key];
        console.log(zones.current);
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
