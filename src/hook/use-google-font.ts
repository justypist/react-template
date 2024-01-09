import { useEffect } from 'react';

const googleFontCDN =
  'https://fonts.googlefonts.cn/css2?family=Noto+Sans:wght@300;400;700;900&display=swap';

export const useGoogleFont = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = googleFontCDN;
    document.head.appendChild(link);
  }, []);
};
