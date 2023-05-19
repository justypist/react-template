import { FC, lazy, Suspense } from 'react';

interface LazyPageProps {
  page: string;
}

export const LazyPage: FC<LazyPageProps> = ({ page }) => {
  const Page = lazy(() => import(`@page/${page}`));

  return (
    <Suspense fallback={<span />}>
      <Page />
    </Suspense>
  );
};
