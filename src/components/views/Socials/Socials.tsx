import React, { FC, ReactElement, useContext } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Card, CardBody, CardFooter, Heading, Icon, Link, Stack, Text, Tooltip } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { ISocial } from 'my-portfolio-types';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import { removeAllSocials } from '@/services/socialsList.service';
import { LoadingContext } from '@/providers/LoadingContext.provider';

const Socials: FC<StaticProps<Array<ISocial>>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {globalLoading, setGlobalLoading} = useContext(LoadingContext);

  const prepareCreateSocialCard = async () => {
    await router.push(ProtectedRoutePath.CREATE_SOCIAL);
  };

  const removeAll = async () => {
    // TODO add confirmation modal
    // TODO fix revalidate after remove all
    setGlobalLoading(true);
    await removeAllSocials();
    await setGlobalLoading(false);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {
          payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
            <Button colorScheme={'teal'} onClick={() => prepareCreateSocialCard()}>Create social card</Button>

            <Button onClick={() => removeAll()} isLoading={globalLoading} colorScheme={'red'}>Remove all social cards</Button>
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

                      <Button variant={'solid'} colorScheme={'red'}>Remove</Button>
                    </Stack>
                  </CardFooter>
                </Stack>
              </Card>
            ))
            :
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={4}>
              <Text>Social cards list is empty</Text>

              <Button colorScheme={'teal'} onClick={() => prepareCreateSocialCard()}>Create social card</Button>
            </Stack>
        }
      </BaseContentContainer>
    </>
  );
};

export default Socials;
