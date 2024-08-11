'use client';

import {Badge} from '@/components/ui/badge';
import {FC, ReactElement, useMemo, useState} from 'react';
import {z, ZodError, ZodIssueCode} from 'zod';
import {Button} from '@/components/ui/button';
import {Plus, X} from 'lucide-react';
import AppInputText from '@/shared/ui/appInput/AppInput.text';

interface Props {
  technologyList: string[];
  setTechnologyList: (list: string[]) => void;
}

const ProjectTechnologiesListForm: FC<Props> = (props): ReactElement => {
  const {technologyList, setTechnologyList} = props;
  const [technologyValue, setTechnologyValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOnChange = (value: string) => {
    setTechnologyValue(value);
  };

  const technologySchema = useMemo(
    () =>
      z
        .object({
          technology: z
            .string({
              required_error: 'Field is required',
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .min(3, 'Value must be at least 3 characters')
            .max(20, 'Value must not exceed 20 characters'),
        })
        .superRefine((data, ctx) => {
          if (technologyList && technologyList.includes(data.technology)) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: ['technology'],
              message: 'This value is already exist in the list',
            });
          }
        }),
    [technologyList],
  );

  const addItemToTechnologiesList = (values: z.infer<typeof technologySchema>) => {
    setErrorMessage('');

    try {
      const result = technologySchema.parse(values);

      if (technologyList) {
        setTechnologyList([...technologyList, result.technology]);
      } else {
        setTechnologyList([result.technology]);
      }

      handleOnChange('');
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setErrorMessage(err.issues.length ? err.issues[0].message : '');
      }
    }
  };

  const removeItemFromTechnologiesList = (payload: string) => {
    setTechnologyList([...technologyList.filter((item) => payload !== item)]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <div className="flex w-full flex-row flex-nowrap items-end justify-start gap-4">
        <AppInputText
          handleOnChange={handleOnChange}
          value={technologyValue}
          mode={'input'}
          type={'text'}
          label={'Technologies list'}
          placeholder={'Technology...'}
          required={true}
          disabled={false}
          isDataPending={false}
          errorMessage={errorMessage}
        />

        <Button onClick={() => addItemToTechnologiesList({technology: technologyValue})} variant="default" title="Add technology" className="gap-2">
          <Plus className="h-5 w-5" />
          <span>Add</span>
        </Button>
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
        {technologyList && technologyList.length > 0 ? (
          <>
            {technologyList.map((techItem, idx) => (
              <div key={`${idx}_${techItem}`}>
                <Badge variant="info" title={techItem} className="flex flex-row flex-nowrap items-center justify-between gap-2">
                  <span>{techItem}</span>

                  <Button onClick={() => removeItemFromTechnologiesList(techItem)} variant="ghost" size="icon" className="h-4 w-4 rounded-full" title="Remove technology">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            ))}
          </>
        ) : (
          <span>Technology list is empty</span>
        )}
      </div>
    </div>
  );
};

export default ProjectTechnologiesListForm;
