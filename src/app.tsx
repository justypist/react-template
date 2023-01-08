/* eslint-disable indent */
import { FC, useState } from 'react';
import { useLogger } from './hook/use-logger';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';

enum Page {
  First,
  Second,
}

export const App: FC = () => {
  useLogger();

  const [pageIndex, setPageIndex] = useState<Page>(Page.First);

  switch (pageIndex) {
    case Page.First:
      return <Page1 onAnimationEnd={() => setPageIndex(Page.Second)} />;
    case Page.Second:
      return <Page2 />;
    default:
      return null;
  }
};
