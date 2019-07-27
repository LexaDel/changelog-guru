export type OptionValue = string | string[] | boolean | undefined;

export interface Constructable<T, C> {
    new (context: C): T;
}

export interface Importable<T, C> {
    default: Constructable<T, C>;
}

export interface Option {
    [key: string]: Option | OptionValue;
}

export type ValueOf<T> = T[keyof T];
