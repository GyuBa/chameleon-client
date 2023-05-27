import * as React from "react";
import {createIcon, IconButton, label, useController, useLightboxState} from "yet-another-react-lightbox/core";

import {useDownload} from "./DownloadContext";

const DownloadIcon = createIcon(
    "Download",
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
);

/** Download button */
export const DownloadButton: React.FC = () => {
    const {labels, render} = useController().getLightboxProps();
    const {triggerDownload} = useDownload();

    return render.buttonDownload ? (
        <>{render.buttonDownload?.({triggerDownload})}</>
    ) : (
        <IconButton
            label={label(labels, "Download")}
            icon={DownloadIcon}
            renderIcon={render.iconDownload}
            onClick={triggerDownload}
        />
    );
};