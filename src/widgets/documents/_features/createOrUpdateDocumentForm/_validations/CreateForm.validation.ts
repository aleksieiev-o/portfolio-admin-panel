import {z} from 'zod';

export const createDocumentFormValidation = {
  title: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(3, 'Value must be at least 3 characters')
    .max(25, 'Value must not exceed 25 characters'),
  visibility: z
    .boolean({
      required_error: 'Field is required',
    })
    .default(true),
  position: z
    .number({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a number',
    })
    .positive({
      message: 'Value must be a positive number',
    }),
  lang: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .length(5, 'The value length must be 5 characters'),
};
