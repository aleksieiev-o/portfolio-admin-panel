import React, {FC, ReactElement, useState} from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {ISkill} from 'my-portfolio-types';
import {useRouter} from 'next/router';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import {useLoading} from '@/hooks/useLoading';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {removeAll, removeById} from '@/services/data.service';
import ActionConfirmationModal, {
  ActionConfirmationModalType,
} from '@/components/UI/ActionConfirmation.modal';

const Skills: FC<StaticProps<Array<ISkill>>> = ({payload}): ReactElement => {
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
  const [preparedToRemoveSkill, setPreparedToRemoveSkill] = useState<ISkill>(
    {} as ISkill,
  );

  const handlePrepareCreateSkill = async () => {
    await router.push(ProtectedRoutePath.CREATE_SKILL);
  };

  const handlePrepareRemoveById = (item: ISkill) => {
    setPreparedToRemoveSkill(item);
    onOpenRemoveByIdModal();
  };

  const handleRemoveById = async (payload: ISkill) => {
    setIsLoading(true);
    await removeById<ISkill>({data: payload}, EndpointsList.SKILLS);
    await setIsLoading(false);
    await setPreparedToRemoveSkill({} as ISkill);
  };

  const handleRemoveAll = async () => {
    setIsLoading(true);
    await removeAll(EndpointsList.SKILLS);
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
              onClick={() => handlePrepareCreateSkill()}
              boxShadow={'md'}
            >
              Create skill
            </Button>

            <Button
              onClick={onOpenRemoveAllModal}
              isLoading={isLoading}
              colorScheme={'red'}
              boxShadow={'md'}
            >
              Remove all skills
            </Button>
          </Stack>
        )}
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {payload.length ? (
          payload.map((skillCard) => (
            <Card
              key={skillCard.id}
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
                        {skillCard.position}.
                      </Heading>

                      <Heading size={'md'} color={'orange.400'}>
                        {skillCard.title}
                      </Heading>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'} fontSize={18} whiteSpace={'nowrap'}>
                        Experience:
                      </Text>

                      <Text>{skillCard.experience}%</Text>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'} fontSize={18} whiteSpace={'nowrap'}>
                        Color:
                      </Text>

                      <Text>{skillCard.color}</Text>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'} whiteSpace={'nowrap'}>
                        Is main skill:
                      </Text>

                      <Tooltip
                        label={
                          skillCard.isMain ? 'Main skill' : 'Secondary skill'
                        }
                        aria-label={'is main skill'}
                      >
                        <Icon
                          color={skillCard.isMain ? 'teal.500' : 'red.500'}
                          as={skillCard.isMain ? DoneIcon : CloseIcon}
                        />
                      </Tooltip>
                    </Stack>

                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      spacing={2}
                      overflow={'hidden'}
                    >
                      <Text as={'b'} whiteSpace={'nowrap'}>
                        Skill visibility:
                      </Text>

                      <Tooltip
                        label={skillCard.visibility ? 'Visible' : 'Hidden'}
                        aria-label={'skill visibility'}
                      >
                        <Icon
                          color={skillCard.visibility ? 'teal.500' : 'red.500'}
                          as={
                            skillCard.visibility
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
                          ProtectedRoutePath.UPDATE_SKILL.replace(
                            '[id]',
                            skillCard.id,
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
                      onClick={() => handlePrepareRemoveById(skillCard)}
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
            <Text>Skills list is empty</Text>

            <Button
              colorScheme={'teal'}
              onClick={() => handlePrepareCreateSkill()}
              boxShadow={'md'}
            >
              Create skill
            </Button>
          </Stack>
        )}
      </BaseContentContainer>

      {isOpenRemoveByIdModal && (
        <ActionConfirmationModal
          actionHandler={() => handleRemoveById(preparedToRemoveSkill)}
          isOpen={isOpenRemoveByIdModal}
          onClose={onCloseRemoveByIdModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove skill confirmation'}
          modalDescription={`You are about to remove skill ${preparedToRemoveSkill.title} now.`}
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
          modalTitle={'Remove all skills confirmation'}
          modalDescription={'You are about to remove all skills now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}
        />
      )}
    </>
  );
};

export default Skills;
