import React, {FC, ReactElement, useState} from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {ISocial} from 'my-portfolio-types';
import {useRouter} from 'next/router';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import {useLoading} from '@/hooks/useLoading';
import {removeAll, removeById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import ActionConfirmationModal, {
  ActionConfirmationModalType,
} from '@/components/UI/ActionConfirmation.modal';

const Socials: FC<StaticProps<Array<ISocial>>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const {
    isOpen: isOpenRemoveByIdModal,
    onOpen: onOpenRemoveByIdModal,
    onClose: onCloseRemoveByIdModal,
  } = useDisclosure();
  const {
    isOpen: isOpenRemoveAllModal,
    onOpen: onOpenRemoveAllModal,
    onClose: onCloseRemoveAllModal,
  } = useDisclosure();
  const [preparedToRemoveSocial, setPreparedToRemoveSocial] = useState<ISocial>(
    {} as ISocial,
  );

  const handlePrepareCreateSocialCard = async () => {
    await router.push(ProtectedRoutePath.CREATE_SOCIAL);
  };

  const handlePrepareRemoveById = (item: ISocial) => {
    setPreparedToRemoveSocial(item);
    onOpenRemoveByIdModal();
  };

  const handleRemoveById = async (payload: ISocial) => {
    setIsLoading(true);
    await removeById<ISocial>({data: payload}, EndpointsList.SOCIALS);
    await setIsLoading(false);
    await setPreparedToRemoveSocial({} as ISocial);
  };

  const handleRemoveAll = async () => {
    setIsLoading(true);
    await removeAll(EndpointsList.SOCIALS);
    await setIsLoading(false);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {payload.length && (
          <Stack
            direction={'row'}
            alignItems={'start'}
            justifyContent={'end'}
            w={'full'}
            spacing={4}
          >
            <Button
              colorScheme={'teal'}
              onClick={() => handlePrepareCreateSocialCard()}
              boxShadow={'md'}
            >
              Create social card
            </Button>

            <Button
              onClick={onOpenRemoveAllModal}
              isLoading={isLoading}
              colorScheme={'red'}
              boxShadow={'md'}
            >
              Remove all social cards
            </Button>
          </Stack>
        )}
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {payload.length ? (
          payload.map((socialCard) => (
            <Card
              key={socialCard.id}
              direction={{base: 'column', sm: 'row'}}
              overflow={'hidden'}
              variant={'outline'}
              boxShadow={'md'}
              w={'full'}
            >
              <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                <CardBody p={4}>
                  <Stack
                    direction={'column'}
                    w={'full'}
                    spacing={4}
                    overflow={'hidden'}
                  >
                    <Stack direction={'row'} spacing={4}>
                      <Heading size={'md'} title={'Position'}>
                        {socialCard.position}.
                      </Heading>

                      <Heading size={'md'} color={'orange.400'}>
                        {socialCard.title}
                      </Heading>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'}>Link:</Text>

                      <Text>{socialCard.url}</Text>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'}>Icon name:</Text>

                      <Text>{socialCard.iconName}</Text>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Button
                        variant={'link'}
                        colorScheme={'teal'}
                        onClick={() => window.open(socialCard.url, '_blank')}
                      >
                        Open
                      </Button>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'} whiteSpace={'nowrap'}>
                        Social card visibility:
                      </Text>

                      <Tooltip
                        label={socialCard.visibility ? 'Visible' : 'Hidden'}
                        aria-label={'social card visibility'}
                      >
                        <Icon
                          color={socialCard.visibility ? 'teal.500' : 'red.500'}
                          as={
                            socialCard.visibility
                              ? VisibilityIcon
                              : VisibilityOffIcon
                          }
                        />
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardBody>

                <CardFooter p={4}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={4}
                  >
                    <Button
                      onClick={() =>
                        router.push(
                          ProtectedRoutePath.UPDATE_SOCIAL.replace(
                            '[id]',
                            socialCard.id,
                          ),
                        )
                      }
                      variant={'solid'}
                      colorScheme={'teal'}
                      boxShadow={'md'}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handlePrepareRemoveById(socialCard)}
                      variant={'solid'}
                      colorScheme={'red'}
                      boxShadow={'md'}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardFooter>
              </Stack>
            </Card>
          ))
        ) : (
          <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            w={'full'}
            spacing={4}
          >
            <Text>Social card list is empty</Text>

            <Button
              colorScheme={'teal'}
              onClick={() => handlePrepareCreateSocialCard()}
              boxShadow={'md'}
            >
              Create social card
            </Button>
          </Stack>
        )}
      </BaseContentContainer>

      {isOpenRemoveByIdModal && (
        <ActionConfirmationModal
          actionHandler={() => handleRemoveById(preparedToRemoveSocial)}
          isOpen={isOpenRemoveByIdModal}
          onClose={onCloseRemoveByIdModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove social card confirmation'}
          modalDescription={`You are about to remove social card ${preparedToRemoveSocial.title} now.`}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}
        />
      )}

      {isOpenRemoveAllModal && (
        <ActionConfirmationModal
          actionHandler={handleRemoveAll}
          isOpen={isOpenRemoveAllModal}
          onClose={onCloseRemoveAllModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove all social cards confirmation'}
          modalDescription={'You are about to remove all social cards now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}
        />
      )}
    </>
  );
};

export default Socials;
