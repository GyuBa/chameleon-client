import {ModelInputType, ModelOutputType} from "./chameleon-platform.common"
import EmptyInputModule from "../pages/model/module/input/EmptyInputModule"
import SingleInputModule from "../pages/model/module/input/SingleInputModule"
import MultiInputModule from "../pages/model/module/input/MultipleInputModule";
import ImageOutputModule from "../pages/model/module/output/ImageOutputModule";
import ZipGalleryOutputModule from "../pages/model/module/output/ZipGalleryOutputModule";
import TextOutputModule from "../pages/model/module/output/TextOutputModule";
import SoundOutputModule from "../pages/model/module/output/SoundOutputModule";
import VideoOutputModule from "../pages/model/module/output/VideoOutputModule";
import BinaryOutputModule from "../pages/model/module/output/BinaryOutputModule";

export const InputModuleMap = {
    [ModelInputType.EMPTY]: EmptyInputModule,
    [ModelInputType.ZIP] : MultiInputModule,
    [ModelInputType.IMAGE] : SingleInputModule,
    [ModelInputType.TEXT] :SingleInputModule,
    [ModelInputType.SOUND]: SingleInputModule,
    [ModelInputType.VIDEO] : SingleInputModule,
    [ModelInputType.BINARY] : SingleInputModule
};

export const OutputModuleMap = {
    [ModelOutputType.BINARY]: BinaryOutputModule,
    [ModelOutputType.IMAGE] : ImageOutputModule,
    [ModelOutputType.ZIP_GALLERY] : ZipGalleryOutputModule,
    [ModelOutputType.TEXT] : TextOutputModule,
    [ModelOutputType.SOUND] : SoundOutputModule,
    [ModelOutputType.VIDEO] : VideoOutputModule
};

export enum PageType {
    HISTORY = 'history',
    EXECUTE = 'execute',
}
// TODO: MODEL, EXECUTE가 더 직관적

export enum ModelsLayout {
    GRID_LAYOUT,
    LIST_LAYOUT
}

export enum ModelFileType {
    IMAGE,
    DOCKERFILE
}

export enum PaymentHistoriesType {
    USAGE ,
    REVENUE
}

export enum ParameterType {
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    DATE = "date",
    TIME = "time",
    DATETIME = "date-time"
}

export enum BuilderType {
    SIMPLE,
    COMPLEX
}
export enum JsonFormPropertyType {
    SCHEMA,
    UI_SCHEMA,
    DATA
}