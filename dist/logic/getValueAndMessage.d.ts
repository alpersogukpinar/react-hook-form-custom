import { ValidationValueMessage } from '../types';
declare const _default: (validationData?: string | number | boolean | RegExp | ValidationValueMessage<import("../types").ValidationValue> | undefined) => ValidationValueMessage<import("../types").ValidationValue> | {
    value: string | number | boolean | RegExp | undefined;
    message: string;
};
export default _default;
