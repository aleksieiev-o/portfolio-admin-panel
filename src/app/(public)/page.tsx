import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import Home from '@/widgets/home/Home';

const HomePage: FC = async (): Promise<ReactElement> => {
  return (
    <ScrollContentWrapper>
      <Home />
    </ScrollContentWrapper>
  );
};

export default HomePage;
