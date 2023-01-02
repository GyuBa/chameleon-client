import useWebSocket, {ReadyState} from "react-use-websocket"
import React, {useCallback, useEffect, useState} from 'react';

export default function WebSocket() {
    const [messageHistory, setMessageHistory] = useState([]);
    const {
        sendMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
        // eslint-disable-next-line no-restricted-globals
    } = useWebSocket((location.protocol.startsWith('https') ? 'wss://' : 'ws://') + location.host + '/websocket', {
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
        <div>
            <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
                Click Me to send 'Hello'
            </button>

        </div>
    );
}