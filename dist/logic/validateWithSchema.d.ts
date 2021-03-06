import { FieldValues, SchemaValidateOptions, ValidationResolver, SchemaValidationResult } from '../types';
declare type YupValidationError = {
    inner: {
        path: string;
        message: string;
        type: string;
    }[];
    path: string;
    message: string;
    type: string;
};
declare type Schema<Data> = {
    validate(value: FieldValues, options?: SchemaValidateOptions): Promise<Data>;
};
export declare const parseErrorSchema: <FormValues>(error: YupValidationError, validateAllFieldCriteria: boolean) => import("../types").NestDataObject<FormValues, import("../types").FieldError>;
export default function validateWithSchema<FormValues extends FieldValues, ValidationContext extends object>(validationSchema: Schema<FormValues>, validateAllFieldCriteria: boolean, data: FormValues, validationResolver?: ValidationResolver<FormValues, ValidationContext>, context?: ValidationContext): Promise<SchemaValidationResult<FormValues>>;
export {};
