import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {
  Button,
  FormControl,
  FormLabel, Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import { updatePersonalInfo } from '@/services/personalInfo.service';
import { IPersonalInfo } from 'my-portfolio-types';
import {useLoading} from '@/hooks/useLoading';

interface Props {
  textInputMode: 'input' | 'textarea';
  inputType?: 'text' | 'email' | 'date';
  fieldKey: keyof IPersonalInfo;
  title: string;
  defaultValue: string;
  textInputPlaceholder: string;
}

const PersonalInfoForm: FC<Props> = (props): ReactElement => {
  const {title, fieldKey, textInputMode, inputType, defaultValue, textInputPlaceholder} = props;
  const { isLoading, setIsLoading } = useLoading();
  const [val, setVal] = useState(fieldKey === 'birthDate' ? defaultValue.slice(0, 10) : defaultValue);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    await updatePersonalInfo({
      field: fieldKey,
      value: fieldKey === 'birthDate' ? new Date(val).toISOString() : val,
    });

    await setIsLoading(false);
  };

  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit}>
      <Stack direction={'row'} alignItems={'end'} justifyContent={'flex-start'} w={'full'} spacing={4}>
        <FormControl>
          <FormLabel whiteSpace={'nowrap'}>{title}:</FormLabel>

          {
            textInputMode === 'input'
              ?
              <Input
                onChange={(e) => setVal(e.currentTarget.value)}
                defaultValue={val}
                placeholder={textInputPlaceholder}
                type={inputType || 'text'}
                w={'full'}/>
              :
              <Textarea
                onChange={(e) => setVal(e.currentTarget.value)}
                defaultValue={val}
                placeholder={textInputPlaceholder}
                rows={5}
                w={'full'}/>
          }
        </FormControl>

        <Button type={'submit'} colorScheme={'teal'} isDisabled={!val.length} isLoading={isLoading}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default PersonalInfoForm;
