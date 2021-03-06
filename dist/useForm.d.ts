import { FormContextValues } from './contextTypes';
import { FieldValues, UseFormOptions } from './types';
export declare function useForm<FormValues extends FieldValues = FieldValues, ValidationContext extends object = object>({ mode, reValidateMode, validationSchema, validationResolver, validationContext, defaultValues, submitFocusError, validateCriteriaMode, }?: UseFormOptions<FormValues, ValidationContext>): FormContextValues<FormValues>;
