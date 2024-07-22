import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {RoutePath} from '@/shared/router/Routes.enum';
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import UserSettings from '@/widgets/userSettings/UserSettings';

const UserSettingsPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.USER_SETTINGS, currentUser.uid],
      // queryFn: async () => await fetchCategories(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserSettings />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default UserSettingsPage;
