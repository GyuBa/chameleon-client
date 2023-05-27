import * as React from "react";

import {Component} from "yet-another-react-lightbox";
import {
    CLASS_FULLSIZE,
    clsx,
    cssClass,
    makeUseContext,
    useEventCallback,
    useLightboxState
} from "yet-another-react-lightbox/core";

const PLUGIN_DOWNLOAD = 'download';

type DownloadContextType = {
    triggerDownload: () => void;
};

const DownloadContext = React.createContext<DownloadContextType | null>(null);

export const useDownload = makeUseContext("useDownload", "DownloadContext", DownloadContext);


function download(dataURL: string, fileName: string) {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = fileName;
    link.click();
}

export const DownloadContextProvider: Component = ({children, downloadInfo}) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const {currentIndex} = useLightboxState().state;
    const triggerDownload = useEventCallback(() => {
        let fileInfo = downloadInfo?.[currentIndex];
        download(fileInfo?.url as string, fileInfo?.fileName as string);
    });

    const context = React.useMemo(
        () => ({
            triggerDownload
        }),
        [triggerDownload]
    );

    return (
        <div ref={containerRef} className={clsx(cssClass(PLUGIN_DOWNLOAD), cssClass(CLASS_FULLSIZE))}>
            <DownloadContext.Provider value={context}>{children}</DownloadContext.Provider>
        </div>
    );
};