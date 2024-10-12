import {z} from 'zod';

export const updateSkillFormValidation = {
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
  isMain: z
    .boolean({
      required_error: 'Field is required',
    })
    .default(true),
  experience: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(2, 'Value must be at least 2 characters')
    .max(4, 'Value must not exceed 4 characters'),
  color: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(7, 'Value must be at least 7 characters')
    .max(7, 'Value must not exceed 7 characters'),
};
