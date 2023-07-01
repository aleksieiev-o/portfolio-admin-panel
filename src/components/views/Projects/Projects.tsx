import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/BaseContentContainer';
import { Heading, Stack, Text, Image, Card, CardBody, CardFooter, Button, Link, Badge, Icon, Tooltip } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { IProject } from 'my-portfolio-types';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';

const Projects: FC<StaticProps<Array<IProject>>> = ({payload}): ReactElement => {
  const router = useRouter();

  const prepareCreateProject = async () => {
    await router.push(ProtectedRoutePath.CREATE_PROJECT);
  };

  return (
    <BaseContentContainer>
      {
        payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
          <Button colorScheme={'teal'} onClick={() => prepareCreateProject()}>Create project</Button>

          <Button colorScheme={'red'}>Remove all projects</Button>
        </Stack>
      }

      {
        payload.length ?
          payload.map((projectCard) => (
            <Card
              key={projectCard.id}
              direction={{ base: 'column', sm: 'row' }}
              overflow={'hidden'}
              variant={'outline'}
              w={'full'}>
              <Image objectFit={'cover'} maxW={{ base: '100%', sm: '200px' }} src={projectCard.fileSrc} alt={projectCard.fileName}/>

              <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                <CardBody p={4}>
                  <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
                    <Stack direction={'row'} spacing={4}>
                      <Tooltip label={'Project visibility'} aria-label={'project visibility'}>
                        <Icon color={projectCard.visibility ? 'teal.500' : 'red.500'} as={projectCard.visibility ? VisibilityIcon : VisibilityOffIcon}/>
                      </Tooltip>

                      <Heading size={'md'} color={'orange.400'}>{projectCard.title}</Heading>
                    </Stack>

                    <Stack direction={'row'} w={'auto'} alignItems={'center'} spacing={2}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Main technology:</Text>

                      <Badge p={2} colorScheme={'green'}>{projectCard.mainTechnology}</Badge>
                    </Stack>

                    <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'start'} spacing={2} overflowX={'auto'}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Technologies:</Text>

                      <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'start'} spacing={4} overflowX={'auto'}>
                        {
                          projectCard.technologies.length ?
                            projectCard.technologies.map((technology) => (
                              <Badge key={technology} p={2} colorScheme={'telegram'}>{technology}</Badge>
                            ))
                            :
                            <Text>Technologies list is empty</Text>
                        }
                      </Stack>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Project description:</Text>

                      <Text>{projectCard.description}</Text>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Repository page:</Text>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                        <Text>{projectCard.repository}</Text>

                        <Button variant={'ghost'} colorScheme={'teal'} onClick={() => window.open(projectCard.repository, '_blank')}>Open repository</Button>
                      </Stack>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Demo page:</Text>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                        <Text>{projectCard.demo}</Text>

                        <Button variant={'ghost'} colorScheme={'teal'} onClick={() => window.open(projectCard.demo, '_blank')}>Open demo page</Button>
                      </Stack>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                      <Text as={'b'} whiteSpace={'nowrap'}>Release date:</Text>

                      <Text>{`${projectCard.releaseDate}`}</Text>
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
            <Text>Projects list is empty</Text>

            <Button colorScheme={'teal'} onClick={() => prepareCreateProject()}>Create project</Button>
          </Stack>
      }
    </BaseContentContainer>
  );
};

export default Projects;
