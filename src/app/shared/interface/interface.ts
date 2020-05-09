export interface ColumnObject {
    columnId: string;
    propertyName: string;
}

export interface MessageCount {
    messageNum?: number;
    userName?: string;
    photoURL?: string;
    title?: string;
    displayName?: string;
}

export interface AlertInputOptions {
    type?: string;
    name?: string | number;
    placeholder?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    handler?: Function;
    min?: string | number;
    max?: string | number;
}