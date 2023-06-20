import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/BaseContentContainer';
import { Heading, Stack, Text, Image, Card, CardBody, CardFooter, Button, Link, Badge, Icon, Tooltip } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Projects: FC = (): ReactElement => {
  return (
    <BaseContentContainer>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow={'hidden'}
        variant={'outline'}
        w={'full'}>
        <Image objectFit={'cover'} maxW={{ base: '100%', sm: '200px' }} src={''} alt={'1111111111'}/>

        <Stack direction={'column'} w={'full'} overflow={'hidden'}>
          <CardBody p={4}>
            <Stack direction={'column'} w={'full'} spacing={4} overflow={'hidden'}>
              <Stack direction={'row'} spacing={4}>
                <Tooltip label={'Project visibility'} aria-label={'project visibility'}>
                  <Icon color={true ? 'green.500' : 'red.500'} as={true ? VisibilityIcon : VisibilityOffIcon}/>
                </Tooltip>

                <Heading size={'md'}>Project name</Heading>
              </Stack>

              <Stack direction={'row'} w={'auto'} alignItems={'center'} spacing={2}>
                <Text as={'b'}>Main technology:</Text>

                <Badge p={2} colorScheme={'green'}>Main technology</Badge>
              </Stack>

              <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'start'} spacing={2} overflowX={'auto'}>
                <Text as={'b'}>Technologies:</Text>

                <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'start'} spacing={4} overflowX={'auto'}>
                  <Badge p={2} colorScheme={'telegram'}>Technology 1</Badge>
                </Stack>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Project description:</Text>

                <Text>Project description</Text>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Repository page:</Text>

                <Text>
                  <Link href={'1111'} target={'_blank'}>Repository page</Link>
                </Text>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Demo page:</Text>

                <Text>
                  <Link href={'1111'} target={'_blank'}>Demo page</Link>
                </Text>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text as={'b'}>Release date:</Text>

                <Text>Release date</Text>
              </Stack>
            </Stack>
          </CardBody>

          <CardFooter p={4}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
              <Button variant={'solid'} colorScheme={'orange'}>Edit</Button>

              <Button variant={'solid'} colorScheme={'red'}>Remove</Button>
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </BaseContentContainer>
  );
};

export default Projects;
