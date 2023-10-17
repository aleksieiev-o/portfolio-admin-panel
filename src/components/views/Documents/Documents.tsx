import React, {FC, ReactElement, useState} from 'react';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {IDocument} from 'my-portfolio-types';
import {useLoading} from '@/hooks/useLoading';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import {
  Button, Card,
  CardBody, CardFooter, Grid, GridItem,
  Heading, Icon,
  Stack,
  Text, Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import {useRouter} from 'next/router';
import BaseContentHeaderContainer from '@/components/UI/Containers/BaseContentHeader.container';
import {EndpointsList} from '@/shared/Endpoints.enum';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {removeAllDocuments, removeDocumentById} from '@/services/documents.service';
import ActionConfirmationModal, {ActionConfirmationModalType} from '@/components/UI/ActionConfirmation.modal';
import { Document as PDFDocument, Page as PDFPage } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Documents: FC<StaticProps<Array<IDocument>>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { isOpen: isOpenRemoveByIdModal, onOpen: onOpenRemoveByIdModal, onClose: onCloseRemoveByIdModal } = useDisclosure();
  const { isOpen: isOpenRemoveAllModal, onOpen: onOpenRemoveAllModal, onClose: onCloseRemoveAllModal } = useDisclosure();
  const [preparedToRemoveDocument, setPreparedToRemoveDocument] = useState<IDocument>({} as IDocument);

  const handlePrepareCreateDocument = async () => {
    await router.push(ProtectedRoutePath.CREATE_DOCUMENT);
  };

  const handlePrepareRemoveById = (item: IDocument) => {
    setPreparedToRemoveDocument(item);
    onOpenRemoveByIdModal();
  };

  const handleRemoveById = async (payload: IDocument) => {
    setIsLoading(true);
    await removeDocumentById(payload, EndpointsList.DOCUMENTS);
    await setIsLoading(false);
    await setPreparedToRemoveDocument({} as IDocument);
  };

  const handleRemoveAll = async () => {
    setIsLoading(true);
    await removeAllDocuments(payload);
    await setIsLoading(false);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <>
      <BaseContentHeaderContainer>
        {
          payload.length && <Stack direction={'row'} alignItems={'start'} justifyContent={'end'} w={'full'} spacing={4}>
            <Button colorScheme={'teal'} onClick={() => handlePrepareCreateDocument()} boxShadow={'md'}>Create document</Button>

            <Button onClick={onOpenRemoveAllModal} isLoading={isLoading} colorScheme={'red'} boxShadow={'md'}>Remove all documents</Button>
          </Stack>
        }
      </BaseContentHeaderContainer>

      <BaseContentContainer>
        {
          payload.length ?
            payload.map((documentCard) => (
              <Card
                key={documentCard.id}
                direction={{ base: 'column', sm: 'row' }}
                overflow={'hidden'}
                variant={'outline'}
                boxShadow={'md'}
                w={'full'}>
                <Stack direction={'column'} w={'full'} overflow={'hidden'}>
                  <CardBody p={4}>
                    <Grid gridTemplateColumns={{md: '1fr 400px'}} gap={6} w={'full'}>
                      <GridItem>
                        <Stack direction={'column'} w={'full'} spacing={4}>
                          <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Heading size={'md'} title={'Position'}>{documentCard.position}.</Heading>

                            <Heading size={'md'} color={'orange.400'}>{documentCard.title}</Heading>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Language:</Text>

                            <Text as={'b'} whiteSpace={'nowrap'}>{documentCard.lang}</Text>
                          </Stack>

                          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                            <Text as={'b'} whiteSpace={'nowrap'}>Document visibility:</Text>

                            <Tooltip label={documentCard.visibility ? 'Visible' : 'Hidden'} aria-label={'document visibility'}>
                              <Icon color={documentCard.visibility ? 'teal.500' : 'red.500'} as={documentCard.visibility ? VisibilityIcon : VisibilityOffIcon}/>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </GridItem>

                      <GridItem>
                        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                          <PDFDocument file={documentCard.fileSrc} onLoadSuccess={onDocumentLoadSuccess}>
                            <PDFPage pageNumber={pageNumber} width={150}/>
                          </PDFDocument>
                        </Stack>
                      </GridItem>
                    </Grid>
                  </CardBody>

                  <CardFooter p={4}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                      <Button
                        onClick={() => router.push(ProtectedRoutePath.UPDATE_DOCUMENT.replace('[id]', documentCard.id))}
                        variant={'solid'}
                        colorScheme={'teal'}
                        boxShadow={'md'}>
                        Edit
                      </Button>

                      <Button onClick={() => handlePrepareRemoveById(documentCard)} variant={'solid'} colorScheme={'red'} boxShadow={'md'}>Remove</Button>
                    </Stack>
                  </CardFooter>
                </Stack>
              </Card>
            ))
            :
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={4}>
              <Text>Documents list is empty</Text>

              <Button colorScheme={'teal'} onClick={() => handlePrepareCreateDocument()} boxShadow={'md'}>Create document</Button>
            </Stack>
        }
      </BaseContentContainer>

      {
        isOpenRemoveByIdModal &&
        <ActionConfirmationModal
          actionHandler={() => handleRemoveById(preparedToRemoveDocument)}
          isOpen={isOpenRemoveByIdModal}
          onClose={onCloseRemoveByIdModal}
          modalType={ActionConfirmationModalType.DANGER}
          modalTitle={'Remove document confirmation'}
          modalDescription={`You are about to remove document ${preparedToRemoveDocument.title} now.`}
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
          modalTitle={'Remove all documents confirmation'}
          modalDescription={'You are about to remove all documents now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Remove'}/>
      }
    </>
  );
};

export default Documents;
