import * as React from "react";

import {Plugin} from "yet-another-react-lightbox";
import {createModule, MODULE_CONTROLLER} from "yet-another-react-lightbox/core";
import {DownloadButton} from "./DownloadButton";
import {DownloadContextProvider} from "./DownloadContext";

const PLUGIN_DOWNLOAD = 'download';


/** Download plugin */
export const Download: Plugin = ({augment, contains, addParent}) => {
    augment(({toolbar: {buttons, ...restToolbar}, ...restProps}) => ({
        toolbar: {buttons: [<DownloadButton key={PLUGIN_DOWNLOAD}/>, ...buttons], ...restToolbar},
        ...restProps,
    }));

    addParent(
        MODULE_CONTROLLER,
        createModule(PLUGIN_DOWNLOAD, DownloadContextProvider)
    );
};