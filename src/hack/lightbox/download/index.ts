import * as React from "react";

import {Download} from "./Download";

declare module "yet-another-react-lightbox" {
    interface LightboxProps {
        downloadInfo?: { fileName: string, url: string }[];
    }

    interface Render {
        buttonDownload?: ({
                              triggerDownload,
                          }: {
            triggerDownload: () => void;
        }) => React.ReactNode;
        iconDownload?: () => React.ReactNode;
    }
}

export default Download;