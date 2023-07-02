import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Card, CardBody, CardFooter, Heading, Icon, Stack, Text, Tooltip } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { ISkill } from 'my-portfolio-types';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';

const Skills: FC<StaticProps<Array<ISkill>>> = ({payload}): ReactElement => {
  const router = useRouter();

  const prepareCreateSkill = async () => {
    await router.push(ProtectedRoutePath.CREATE_SKILL);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {
          payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
            <Button colorScheme={'teal'} onClick={() => prepareCreateSkill()}>Create skill</Button>

            <Button colorScheme={'red'}>Remove all skills</Button>
          </Stack>
        }
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {
          payload.length ?
            payload.map((skillCard) => (
              <Card
                key={skillCard.id}
                direction={{ base: 'column', sm: 'row' }}
                overflow={'hidden'}
                variant={'outline'}
                w={'full'}>
                <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                  <CardBody p={4}>
                    <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
                      <Stack direction={'row'} spacing={4}>
                        <Tooltip label={'Skill visibility'} aria-label={'skill visibility'}>
                          <Icon color={skillCard.visibility ? 'teal.500' : 'red.500'} as={skillCard.visibility ? VisibilityIcon : VisibilityOffIcon}/>
                        </Tooltip>

                        <Heading size={'md'}>{skillCard.title}</Heading>
                      </Stack>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                        <Text as={'b'} fontSize={18} whiteSpace={'nowrap'}>Experience:</Text>

                        <Text>{skillCard.experience}</Text>
                      </Stack>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                        <Text as={'b'} fontSize={18} whiteSpace={'nowrap'}>Color:</Text>

                        <Text>{skillCard.color}</Text>
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
            ))
            :
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={4}>
              <Text>Skills list is empty</Text>

              <Button colorScheme={'teal'} onClick={() => prepareCreateSkill()}>Create skill</Button>
            </Stack>
        }
      </BaseContentContainer>
    </>
  );
};

export default Skills;
