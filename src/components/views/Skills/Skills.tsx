import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/BaseContentContainer';
import { Button, Card, CardBody, CardFooter, Heading, Icon, Stack, Text, Tooltip } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Skills: FC = (): ReactElement => {
  return (
    <BaseContentContainer>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow={'hidden'}
        variant={'outline'}
        w={'full'}>
        <Stack direction={'column'} w={'full'} overflow={'hidden'}>
          <CardBody p={4}>
            <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
              <Stack direction={'row'} spacing={4}>
                <Tooltip label={'Skill visibility'} aria-label={'skill visibility'}>
                  <Icon color={true ? 'green.500' : 'red.500'} as={true ? VisibilityIcon : VisibilityOffIcon}/>
                </Tooltip>

                <Heading size={'md'}>Skill name</Heading>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Experience:</Text>

                <Text>Experience</Text>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Color:</Text>

                <Text>Color</Text>
              </Stack>
            </Stack>
          </CardBody>

          <CardFooter p={4}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
              <Button variant={'solid'} colorScheme={'teal'}>Edit</Button>

              <Button variant={'solid'} colorScheme={'red'}>Remove</Button>
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </BaseContentContainer>
  );
};

export default Skills;
