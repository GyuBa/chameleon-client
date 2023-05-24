import React, {useEffect} from 'react';
import {FitAddon} from "xterm-addon-fit";
import {Terminal as XTerm} from 'xterm';
import 'xterm/css/xterm.css';
import {WSMessageType} from "../../types/chameleon-platform.common";

let terminal: XTerm;
let lastResize: string;
let global: any = window;

export default function Terminal() {

// export default function Terminal({context}: AppProps) {
    /*useEffect(() => {
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
        };
        terminal.loadAddon(fitAddon);
        terminal.open(document.querySelector('.terminal-container') as HTMLElement);
        terminal.onResize((event) => {
            let resize = JSON.stringify(event);
            if (lastResize !== resize) {
                lastResize = resize;
                // enum, sender로 리팩토링할 것
                context.sendJsonMessage({msg: WSMessageType.TERMINAL_RESIZE, ...event});
            }
        });

        const resizeObserver = new ResizeObserver(entries => {
            try {
                global?.fitTerminal();
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
        let message = context.lastJsonMessage as any;
        // enum으로 리팩토링할 것
        if (message?.msg === WSMessageType.UpdateModel && message?.model?.status === ModelStatus.DEPLOYING) {
            terminal.clear();
        } else if (message?.msg === WSMessageType.Terminal) {
            terminalQueue.push(message.data);
            if (isWorking) {
                return;
            }
            isWorking = true;
            setTimeout(async () => {
                function write(data: string) {
                    return new Promise(resolve => {
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
    }, [context.lastJsonMessage]);*/

/*
    let history = context.history;
    let terminalData = context.path.startsWith('model') ? context.model?.lastHistory?.terminal as string : history?.terminal;
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
    }, [context.model?.uniqueName, history]);
*/

    return <div className="terminal-container"/>;
}