export type StaticProps<T> = { payload: T };
export type StaticPaths<T> = Array<{ params: { id: string } }>;

export type StaticPropsResponse<T> = {
  props: StaticProps<T>,
  revalidate? : number,
  fallback?: 'blocking' | false,
};

export type StaticPathsResponse<T> = {
  paths: StaticPaths<T>,
  revalidate? : number,
  fallback?: 'blocking' | false,
};
