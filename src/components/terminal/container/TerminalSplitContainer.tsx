import React, {useRef} from 'react';
import Split from 'react-split'
import Terminal from "../Terminal";
import {TerminalSplitContainerProps} from "../../../types/chameleon-client";

export default function TerminalSplitContainer({children, moduleData}: TerminalSplitContainerProps) {
    const splitRef = useRef<any>();
    let global: any = window;
    let fitTerminal = global?.fitTerminal;
    return <Split ref={splitRef} className="split-container" sizes={[75, 25]} direction="vertical"
                  onDragEnd={() => fitTerminal?.()}
                  onDragExit={() => fitTerminal?.()}>
        <div className="main-content-container">
            {children}
        </div>
        <Terminal moduleData={moduleData}/>
    </Split>;
}
