import './app.less';

import { fabric } from 'fabric';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLogger } from './hook/use-logger';

import { downloadDataURL } from './utils';

const CanvasId = 'canvas-main';

const ViewSize = 600;

// 获取缩放倍数
const getZoom = (width: number, height: number) => {
  return ViewSize / Math.max(width, height);
};

export const App: FC = () => {
  useLogger();

  const ref = useRef<HTMLCanvasElement>(null);

  const rerender = useCallback((canvas: fabric.Canvas) => {
    if (!canvas) {
      return;
    }

    const zoom = canvas.getZoom();

    const previewCanvas = ref.current;

    if (!previewCanvas) {
      return;
    }

    const preCtx = previewCanvas.getContext('2d');
    if (!preCtx) {
      return;
    }
    preCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    preCtx.drawImage(
      canvas.toCanvasElement(),
      150,
      150,
      300,
      300,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
    );

    canvas.setZoom(zoom);
  }, []);

  useEffect(() => {
    const canvasWidth = 1000;
    const canvasHeight = 1000;

    const zoom = getZoom(canvasWidth, canvasHeight);

    const canvas = new fabric.Canvas(CanvasId, {
      width: canvasWidth * zoom,
      height: canvasHeight * zoom,
    });

    canvas.setZoom(zoom);

    const rect = new fabric.Rect({
      top: 250,
      left: 250,
      width: 500,
      height: 500,
      fill: 'red',
    });

    canvas.add(rect);

    rerender(canvas);
    canvas.on('mouse:move', () => rerender(canvas));

    return () => {
      canvas.dispose();
    };
  }, [rerender]);

  return (
    <div className="app">
      <div style={{ position: 'relative' }}>
        <canvas id={CanvasId} style={{ border: '1px solid black' }} />
        <div className="preview-rect" />
      </div>
      <canvas
        ref={ref}
        width={100}
        height={100}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};
