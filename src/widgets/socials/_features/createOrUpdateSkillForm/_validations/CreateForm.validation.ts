import {z} from 'zod';

export const createSocialFormValidation = {
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
  url: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .url()
    .min(10, 'Value must be at least 10 characters'),
  iconName: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(1, 'Value must be at least 1 characters'),
};
