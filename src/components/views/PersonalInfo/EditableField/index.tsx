import React, { FC, ReactElement } from 'react';
import { Editable, EditableInput, EditablePreview, EditableTextarea, Stack, Text } from '@chakra-ui/react';
import { updatePersonalInfo } from '@/services/personalInfo.service';
import { IPersonalInfo } from 'my-portfolio-types';

interface Props {
  textInputMode: 'input' | 'textarea';
  inputType?: 'text' | 'email' | 'date';
  fieldKey: keyof IPersonalInfo;
  title: string;
  defaultValue: string;
  textInputPlaceholder: string;
}

const EditableField: FC<Props> = (props): ReactElement => {
  const {title, fieldKey, textInputMode, inputType, defaultValue, textInputPlaceholder} = props;

  const handleSubmit = async (val: string) => {
    await updatePersonalInfo({
      field: fieldKey,
      value: fieldKey === 'birthDate' ? new Date(val).toISOString() : val,
    });
  };

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} w={'full'} overflow={'hidden'} spacing={4}>
      <Text as={'b'} fontSize={18} whiteSpace={'nowrap'}>{title}:</Text>

      <Editable
        onSubmit={(val) => handleSubmit(val)}
        defaultValue={fieldKey === 'birthDate' ? defaultValue.slice(0, 10) : defaultValue}
        submitOnBlur={false}
        placeholder={textInputPlaceholder}
        w={'full'}
        p={1}>
        <EditablePreview w={'full'}/>

        {
          textInputMode === 'input'
            ?
            <EditableInput type={inputType || 'text'}/>
            :
            <EditableTextarea/>
        }
      </Editable>
    </Stack>
  );
};

export default EditableField;
