import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid, GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { IProject } from 'my-portfolio-types';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { useLoading } from '@/hooks/useLoading';
import {removeAll, removeAllFiles, removeById} from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import ActionConfirmationModal, { ActionConfirmationModalType } from '@/components/UI/ActionConfirmation.modal';

const Projects: FC<StaticProps<Array<IProject>>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const { isOpen: isOpenRemoveByIdModal, onOpen: onOpenRemoveByIdModal, onClose: onCloseRemoveByIdModal } = useDisclosure();
  const { isOpen: isOpenRemoveAllModal, onOpen: onOpenRemoveAllModal, onClose: onCloseRemoveAllModal } = useDisclosure();
  const [preparedToRemoveProject, setPreparedToRemoveProject] = useState<IProject>({} as IProject);

  const handlePrepareCreateProject = async () => {
    await router.push(ProtectedRoutePath.CREATE_PROJECT);
  };

  const handlePrepareRemoveById = (item: IProject) => {
    setPreparedToRemoveProject(item);
    onOpenRemoveByIdModal();
  };

  const handleRemoveById = async (payload: IProject) => {
    // TODO fix revalidate after remove by id
    setIsLoading(true);
    await removeById<IProject>(EndpointsList.PROJECTS, payload);
    await setIsLoading(false);
    await setPreparedToRemoveProject({} as IProject);
  };

  const handleRemoveAll = async () => {
    // TODO fix revalidate after remove all
    setIsLoading(true);
    await removeAll<Array<IProject>>(EndpointsList.PROJECTS);
    await removeAllFiles(payload);
    await setIsLoading(false);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {
          payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
            <Button colorScheme={'teal'} onClick={() => handlePrepareCreateProject()} boxShadow={'md'}>Create project</Button>

            <Button onClick={onOpenRemoveAllModal} isLoading={isLoading} colorScheme={'red'} boxShadow={'md'}>Remove all projects</Button>
          </Stack>
        }
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {
          payload.length ?
            payload.map((projectCard) => (
              <Card
                key={projectCard.id}
                direction={{ base: 'column', sm: 'row' }}
                overflow={'hidden'}
                variant={'outline'}
                boxShadow={'md'}
                w={'full'}>
                <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                  <CardBody p={4}>
                    <Grid gridTemplateColumns={{md: '1fr 400px'}} gap={6} w={'full'}>
                      <GridItem overflow={'hidden'}>
                        <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
                          <Stack direction={'row'} spacing={4}>
                            <Tooltip label={'Project visibility'} aria-label={'project visibility'}>
                              <Icon color={projectCard.visibility ? 'teal.500' : 'red.500'} as={projectCard.visibility ? VisibilityIcon : VisibilityOffIcon}/>
                            </Tooltip>

                            <Heading size={'md'} color={'orange.400'}>{projectCard.title}</Heading>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Project description:</Text>

                            <Text>{projectCard.description}</Text>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Repository page:</Text>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                              <Text>{projectCard.repository}</Text>

                              <Button variant={'link'} colorScheme={'teal'} onClick={() => window.open(projectCard.repository, '_blank')}>Open repository</Button>
                            </Stack>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Demo page:</Text>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                              <Text>{projectCard.demo}</Text>

                              <Button variant={'link'} colorScheme={'teal'} onClick={() => window.open(projectCard.demo, '_blank')}>Open demo page</Button>
                            </Stack>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Release date:</Text>

                            <Text>{new Date(projectCard.releaseDate).toDateString()}</Text>
                          </Stack>

                          <Stack direction={'row'} w={'auto'} alignItems={'center'} spacing={2}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Main technology:</Text>

                            <Badge p={2} colorScheme={'green'}>{projectCard.mainTechnology}</Badge>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflowX={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Technologies:</Text>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflowX={'auto'}>
                              {
                                projectCard.technologies?.length ?
                                  projectCard.technologies.map((technology) => (
                                    <Badge key={technology} p={2} colorScheme={'telegram'}>{technology}</Badge>
                                  ))
                                  :
                                  <Text>Technologies list is empty</Text>
                              }
                            </Stack>
                          </Stack>
                        </Stack>
                      </GridItem>

                      <GridItem>
                        <Stack justifyContent={'center'} w={'full'}>
                          <Image
                            src={projectCard.fileSrc}
                            alt={projectCard.fileName}
                            objectFit={'contain'}
                            maxW={400}/>
                        </Stack>
                      </GridItem>
                    </Grid>
                  </CardBody>

                  <CardFooter p={4}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                      <Button
                        onClick={() => router.push(ProtectedRoutePath.UPDATE_PROJECT.replace('[id]', projectCard.id))}
                        variant={'solid'}
                        colorScheme={'teal'}
                        boxShadow={'md'}>
                        Edit
                      </Button>

                      <Button onClick={() => handlePrepareRemoveById(projectCard)} variant={'solid'} colorScheme={'red'} boxShadow={'md'}>Remove</Button>
                    </Stack>
                  </CardFooter>
                </Stack>
              </Card>
            ))
            :
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={4}>
              <Text>Projects list is empty</Text>

              <Button colorScheme={'teal'} onClick={() => handlePrepareCreateProject()} boxShadow={'md'}>Create project</Button>
            </Stack>
        }
      </BaseContentContainer>

      {
        isOpenRemoveByIdModal &&
        <ActionConfirmationModal
          actionHandler={() => handleRemoveById(preparedToRemoveProject)}
          isOpen={isOpenRemoveByIdModal}
          onClose={onCloseRemoveByIdModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove project confirmation'}
          modalDescription={`You are about to remove project ${preparedToRemoveProject.title} now.`}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}/>
      }

      {
        isOpenRemoveAllModal &&
        <ActionConfirmationModal
          actionHandler={handleRemoveAll}
          isOpen={isOpenRemoveAllModal}
          onClose={onCloseRemoveAllModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove all projects confirmation'}
          modalDescription={'You are about to remove all projects now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
};

export default Projects;
