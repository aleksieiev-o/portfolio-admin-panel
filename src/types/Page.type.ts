import { NextPage } from 'next';

type TypePageRoles = {
  withAuth?: boolean
};

export type NextPageWithAuth<P = {}> = NextPage<P> & TypePageRoles;

export type TypeComponentAuthFields = {
  Component: TypePageRoles;
};
