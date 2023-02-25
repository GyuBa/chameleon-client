import useWebSocket, {ReadyState} from "react-use-websocket"
import React, {useCallback} from 'react';
import {WebSocketData} from "../../types/Types";

export default function WebSocket({style, className, event}: WebSocketData) {
    const {
        sendMessage,
        readyState,
    } = useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
        onMessage: (message) => {
            let data = JSON.parse(message.data);
        }
    });


    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

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
            onClick={handleClickSendMessage}
            style={style}
            className={`hover:drop-shadow-xl whitespace-nowrap p-3 ${className}`}
            disabled={readyState !== ReadyState.OPEN}
        >
            {'The WebSocket is currently'}{connectionStatus}
            {event}
        </button>

    );
}