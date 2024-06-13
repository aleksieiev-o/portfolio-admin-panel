import React, { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/lib/firebase/firebase';
import { router } from '@/router/Router';
import ActionConfirmationModal, { ActionConfirmationModalType } from '@/components/UI/ActionConfirmation.modal';

const NavMenu: FC = (): ReactElement => {
  const [signOut, loading] = useSignOut(firebaseAuth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout error: ', err);
    }
  };

  return (
    <>
      <Stack w={'full'} direction={'row'} alignItems={'center'} p={4} mb={4} boxShadow={'md'}>
        <Stack w={'full'} direction={'row'} alignItems={'center'} justifyContent={'center'} mr={4}>
          {
            router.map((rout) => {
              return <Link key={rout.name} href={rout.href}>
                <Button variant={'ghost'}>
                  {rout.name}
                </Button>
              </Link>;
            })
          }
        </Stack>

        <Button onClick={onOpen} isLoading={loading} title={'Log out'} variant={'ghost'}>Sign out</Button>
      </Stack>

      {
        isOpen &&
        <ActionConfirmationModal
          actionHandler={handleLogout}
          isOpen={isOpen}
          onClose={onClose}
          modalType={ActionConfirmationModalType.WARNING}
          modalTitle={'Log out confirmation'}
          modalDescription={'You are about to log out now.'}
          modalQuestion={'Are you sure?'}
          buttonText={'Log out'}/>
      }
    </>
  );
};

export default NavMenu;
