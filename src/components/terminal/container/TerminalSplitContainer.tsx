import React, {useRef} from 'react';
import Split from 'react-split'

type Props = { children?: React.ReactElement };
export default function TerminalSplitContainer({children}: Props) {
    let previousSize = [75, 25];
    let previousCardHeight = -1;
    const splitRef = useRef<any>();
    let global: any = window;
    let fitTerminal = global?.fitTerminal;

    const onDrag = (sizes: number[]) => {
        fitTerminal?.();
        let targetCardBody = document.querySelector('.card-upload > .card-body') as HTMLElement;
        let cardHeight = targetCardBody.clientHeight;
        if (cardHeight === 0) {
            splitRef.current.split.setSizes(previousSize);
        } else {
            previousSize = sizes;
            previousCardHeight = cardHeight;
        }
    };

    return <Split ref={splitRef} className="split-container" sizes={[75, 25]} direction="vertical" onDrag={onDrag}
                  onDragEnd={() => fitTerminal?.()}
                  onDragExit={() => fitTerminal?.()}>
        <div className="main-content-container">
            {children}
        </div>
        <div className='bg-black text-white'>asdfasf</div>
        {/*<Terminal context={context}/>*/}
    </Split>;
}
