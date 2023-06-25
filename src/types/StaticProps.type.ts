export type StaticProps<T> = { payload: T };

export type StaticPropsResponse<T> = {
  props: StaticProps<T>,
  revalidate? : number,
  fallback?: 'blocking' | false,
};
