import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Card, CardBody, CardFooter, Heading, Icon, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { ISocial } from 'my-portfolio-types';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import { useLoading } from '@/hooks/useLoading';
import { removeAll, removeById } from '@/services/dataList.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import ActionConfirmationModal, { ActionConfirmationModalType } from '@/components/UI/ActionConfirmation.modal';

const Socials: FC<StaticProps<Array<ISocial>>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const { isOpen: isOpenRemoveByIdModal, onOpen: onOpenRemoveByIdModal, onClose: onCloseRemoveByIdModal } = useDisclosure();
  const { isOpen: isOpenRemoveAllModal, onOpen: onOpenRemoveAllModal, onClose: onCloseRemoveAllModal } = useDisclosure();
  const [preparedToRemoveSocial, setPreparedToRemoveSocial] = useState<ISocial | null>(null);

  const handlePrepareCreateSocialCard = async () => {
    await router.push(ProtectedRoutePath.CREATE_SOCIAL);
  };

  const handlePrepareRemoveById = (item: ISocial) => {
    setPreparedToRemoveSocial(item);
    onOpenRemoveByIdModal();
  };

  const handleRemoveById = async (id: string) => {
    // TODO fix revalidate after remove by id
    setIsLoading(true);
    await removeById(EndpointsList.SOCIALS, id);
    await setIsLoading(false);
    await setPreparedToRemoveSocial(null);
  };

  const handleRemoveAll = async () => {
    // TODO fix revalidate after remove all
    setIsLoading(true);
    await removeAll(EndpointsList.SOCIALS);
    await setIsLoading(false);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {
          payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
            <Button colorScheme={'teal'} onClick={() => handlePrepareCreateSocialCard()}>Create social card</Button>

            <Button onClick={onOpenRemoveAllModal} isLoading={isLoading} colorScheme={'red'}>Remove all social cards</Button>
          </Stack>
        }
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {
          payload.length ?
            payload.map((socialCard) => (
              <Card
                key={socialCard.id}
                direction={{ base: 'column', sm: 'row' }}
                overflow={'hidden'}
                variant={'outline'}
                w={'full'}>
                <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                  <CardBody p={4}>
                    <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
                      <Stack direction={'row'} spacing={4}>
                        <Tooltip label={'Page visibility'} aria-label={'page visibility'}>
                          <Icon color={socialCard.visibility ? 'teal.500' : 'red.500'} as={socialCard.visibility ? VisibilityIcon : VisibilityOffIcon}/>
                        </Tooltip>

                        <Heading size={'md'}>{socialCard.title}</Heading>
                      </Stack>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                        <Text as={'b'}>Link:</Text>

                        <Text>{socialCard.url}</Text>

                        <Button variant={'ghost'} colorScheme={'teal'} onClick={() => window.open(socialCard.url, '_blank')}>Open</Button>
                      </Stack>
                    </Stack>
                  </CardBody>

                  <CardFooter p={4}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                      <Button variant={'solid'} colorScheme={'teal'}>Edit</Button>

                      <Button onClick={() => handlePrepareRemoveById(socialCard)} variant={'solid'} colorScheme={'red'}>Remove</Button>
                    </Stack>
                  </CardFooter>
                </Stack>
              </Card>
            ))
            :
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={4}>
              <Text>Social cards list is empty</Text>

              <Button colorScheme={'teal'} onClick={() => handlePrepareCreateSocialCard()}>Create social card</Button>
            </Stack>
        }
      </BaseContentContainer>

      {
        isOpenRemoveByIdModal &&
        <ActionConfirmationModal
          actionHandler={() => handleRemoveById(preparedToRemoveSocial.id!)}
          isOpen={isOpenRemoveByIdModal}
          onClose={onCloseRemoveByIdModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove social card confirmation'}
          modalDescription={`You are about to remove social card ${preparedToRemoveSocial.title!} now.`}
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
          modalTitle={'Remove all social cards confirmation'}
          modalDescription={'You are about to remove all social cards now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
};

export default Socials;
