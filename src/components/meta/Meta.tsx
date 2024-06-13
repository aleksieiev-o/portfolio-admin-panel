import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {IMeta} from '@/components/meta/Meta.interface';
import Head from 'next/head';

const getTitle = (title: string): string => `${title} | Portfolio admin panel`;

const Meta: FC<PropsWithChildren<IMeta>> = (props): ReactElement => {
  const {children, title, description} = props;

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>

        {description ? (
          <>
            <link rel={'icon'} href={'/favicon.ico'} />
            <meta
              name={'viewport'}
              content={'width=device-width, initial-scale=1'}
            />
            <meta name={'description'} content={description} />
            <meta name={'og:title'} content={getTitle(title)} />
            <meta name={'og:description'} content={description} />
          </>
        ) : (
          <meta name={'robots'} content={'noindex, nofollow'} />
        )}
      </Head>

      {children}
    </>
  );
};

export default Meta;
