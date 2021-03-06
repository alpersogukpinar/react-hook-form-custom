export declare const appendId: <FormArrayValues extends Record<string, any> = Record<string, any>>(value: FormArrayValues, keyName: string) => ({
    [x: string]: string;
} & FormArrayValues) | {
    value: never;
};
export declare const mapIds: (data: any, keyName: string) => any[];
