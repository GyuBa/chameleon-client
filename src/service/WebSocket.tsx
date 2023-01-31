import useWebSocket, {ReadyState} from "react-use-websocket"
import React, {useCallback, useState} from 'react';
import {WebSocketData} from "../types/Types";

export default function WebSocket({message, icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, Event} : WebSocketData) {
    const [messageHistory, setMessageHistory] = useState([]);
    const {
        sendMessage,
        // sendJsonMessage,
        readyState,
        // eslint-disable-next-line no-restricted-globals
    } = useWebSocket((location.protocol.startsWith('https') ? 'wss://' : 'ws://') + location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
        onMessage: (message) => {
            let data = JSON.parse(message.data);
        }
    });


    const handleClickSendMessage = useCallback(() => sendMessage(message), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <button
            type="button"
            onClick = {handleClickSendMessage}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
            disabled={readyState !== ReadyState.OPEN}
        >
            {icon}{text}
            {Event}
        </button>
    );
}