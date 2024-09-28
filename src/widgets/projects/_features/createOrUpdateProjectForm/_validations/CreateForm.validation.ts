import {z} from 'zod';

export const createProjectFormValidation = {
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
  description: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(10, 'Value must be at least 10 characters')
    .max(280, 'Value must not exceed 280 characters'),
  mainTechnology: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(3, 'Value must be at least 3 characters')
    .max(25, 'Value must not exceed 25 characters'),
  releaseDate: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim(),
  repository: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .url({
      message: 'Value must be an URL',
    }),
  demo: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .url({
      message: 'Value must be an URL',
    }),
  technologies: z.array(
    z
      .string({
        required_error: 'Field is required',
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .min(3, 'Value must be at least 3 characters')
      .max(25, 'Value must not exceed 25 characters'),
  ),
  screensList: z.custom<FileList>((payload) => {
    if (!(payload instanceof FileList)) {
      return false;
    }

    if (payload.length === 0) {
      return false;
    }

    return true;
  }),
  // .refine(
  //   (payload) => {
  //     const images = Array.from(payload).filter((item) => item.size <= 3 * 1024 * 1024);
  //     return images.length === payload.length; // TODO rework this check!
  //   },
  //   {
  //     message: 'Image must not exceed 3MB',
  //   },
  // ),
};
