export enum PageType {
    HISTORY = 'history',
    EXECUTE = 'execute',
}

export enum ModelsLayout {
    GRID_LAYOUT,
    LIST_LAYOUT
}

export enum ModelFileType {
    IMAGE,
    DOCKERFILE
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

export enum PGType {
    KAKAO='kakao',
    PAYCO='payco',
    TOSSPAY='tosspay',
    NONE=''
}

export enum PGTypeKorean {
    KAKAO='카카오페이',
    PAYCO='페이코',
    TOSSPAY='토스페이'
}