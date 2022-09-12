import React, { useState, useRef, useEffect } from "react";
import Display from "../../components/Display";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Zone } from "../../../game";
import { unpackEntities, unpackMessage, unpackZone } from "../../../messages";

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
      const newZoneData: { [key: string]: Zone } = unpackMessage(lastMessage.data).data;
      const unpackedZones: { [key: string]: Zone } = {};
      for (const zoneId in newZoneData) unpackedZones[zoneId] = unpackZone(newZoneData[zoneId]);
      //       for(const zoneId in unpackedZones){
      //         let key: keyof Zone
      //         if(!zones.current[zoneId]) zones.current[zoneId] = unpackedZones[zoneId]
      //         else
      //         for(key in unpackedZones[zoneId]){
      // //
      //         }
      //       }
      zones.current = unpackedZones;
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
