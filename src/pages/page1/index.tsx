import './index.less';

import { AnimationEventHandler, FC, useRef } from 'react';

import cloud from '../../asset/cloud.jpg';

interface Page1Props {
  onAnimationEnd?: AnimationEventHandler<HTMLImageElement>;
}

export const Page1: FC<Page1Props> = ({ onAnimationEnd }) => {
  const ref = useRef<HTMLImageElement>(null);

  return (
    <div className="page1">
      <img
        ref={ref}
        className="cloud"
        src={cloud}
        title="cloud"
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
};
