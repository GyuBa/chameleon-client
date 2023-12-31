import React, {useEffect, useState} from 'react';
import {FitAddon} from "xterm-addon-fit";
import {Terminal as XTerm} from 'xterm';
import 'xterm/css/xterm.css';
import {
    HistoryStatus,
    TerminalSizeOptions,
    WSMessage,
    WSMessageType,
    WSTerminalResizeMessage
} from "../../types/chameleon-platform.common";
import {ModuleData} from "../../types/chameleon-client";
import useWebSocket from "react-use-websocket";
import useGlobalContext from "../../contexts/hook/useGlobalContext";

let terminal: XTerm;
let lastResize: string;
let global: any = window;

export default function Terminal({moduleData: {model, type, history}}: { moduleData: ModuleData }) {
    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket<WSMessage>((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
        share: true
    });

    const [terminalSizeOptions, setTerminalSizeOptions] = useState<TerminalSizeOptions>({rows: -1, cols: -1});

    useEffect(() => {
        sendJsonMessage({
            msg: WSMessageType.TERMINAL_RESIZE,
            ...terminalSizeOptions,
            historyId: history?.id
        } as WSTerminalResizeMessage);
    }, [terminalSizeOptions]);

    useEffect(() => {
        // WARNING: ref hook로 수정 가능한지 알아볼 것
        global.terminal?.dispose();
        terminal = new XTerm({cursorBlink: false, allowProposedApi: true});
        let fitAddon = new FitAddon();
        global.fitTerminal = () => {
            let width = document.querySelector('.terminal')?.clientWidth;
            for (let i = 0; i < 25; i++) {
                fitAddon && fitAddon.fit();
                let currentWidth = document.querySelector('.terminal')?.clientWidth;
                if (width === currentWidth) {
                    break;
                }
                width = currentWidth;
            }
            if (terminalSizeOptions.cols !== terminal.cols || terminalSizeOptions.rows !== terminal.rows) {
                setTerminalSizeOptions({cols: terminal.cols, rows: terminal.rows});
            }
        };
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('.terminal-container') as HTMLElement);
        terminal.onResize((event) => {
            if (terminalSizeOptions.cols !== event.cols || terminalSizeOptions.rows !== event.rows) {
                setTerminalSizeOptions({cols: event.cols, rows: event.rows});
            }
        });

        const resizeObserver = new ResizeObserver(entries => {
            try {
                setTimeout(_ => {
                    global?.fitTerminal();
                }, 100);
            } catch (err) {
                console.log(err);
            }
        });

        resizeObserver.observe(document.querySelector(".terminal-container") as HTMLElement);
        global.terminal = terminal;

        let viewport = document.querySelector('.xterm-viewport') as HTMLElement;
        viewport.style.overflowY = 'hidden';
        global?.fitTerminal();
    }, []);

    useEffect(() => {
        // Strict mode 해제
        let terminalQueue: string[] = global.terminalQueue = [];
        let isWorking = false;
        let message = lastJsonMessage;
        // enum으로 리팩토링할 것
        if (message?.msg === WSMessageType.UPDATE_HISTORY && message?.history?.status === HistoryStatus.INITIALIZING) {
            terminal.clear();
        } else if (message?.msg === WSMessageType.TERMINAL_BUFFER) {
            terminalQueue.push(message.data);
            if (isWorking) {
                return;
            }
            isWorking = true;
            setTimeout(async () => {
                function write(data: string) {
                    return new Promise(resolve => {
                        console.log('Write', data);
                        terminal.write(data, () => {
                            terminal.scrollToBottom();
                            resolve(void 0);
                        });
                    });
                }

                while (terminalQueue.length > 0) {
                    await write(terminalQueue.shift() as string);
                }
                isWorking = false;
            });
        }
    }, [lastJsonMessage]);

    const terminalData = history?.terminal;
    useEffect(() => {
        if (terminal) {
            terminal.clear();
            if (terminalData) {
                // WARNING: 임시 조치
                terminal.write(terminalData, () => {
                    setTimeout(() => {
                        terminal.scrollToBottom();
                    }, 100);
                });
            }
        }
    }, [terminalData]);
    return <div className="terminal-container"/>;
}