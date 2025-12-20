'use client';

import React, { useRef } from 'react';
import Lightbox, { ThumbnailsRef } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css'; // ✅ this works with default build
import NextJsImage from './image';

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src: string, size: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

const LightBox: React.FC<{
  open: boolean;
  onClose: () => void;
  index: number;
  images: { src: string; width: number; height: number }[];
  thumbnails?: boolean;
}> = ({ images, open, onClose, index, thumbnails = true }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const slides = images.map(({ src, width, height }) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: [...imageSizes, ...deviceSizes]
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  /* -------------------------------------------------------------------------- */
  /*                                    REFS                                    */
  /* -------------------------------------------------------------------------- */

  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const fullscreenRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  if (typeof window === 'undefined') return null;

  return (
    <Lightbox
      open={open}
      close={() => onClose()}
      slides={slides}
      index={index}
      plugins={[Zoom, Captions, Thumbnails, Counter, Fullscreen]}
      counter={{ container: { style: { bottom: 'unset', top: 0 } } }}
      thumbnails={{ ref: thumbnailsRef, hidden: !thumbnails }}
      fullscreen={{ ref: fullscreenRef }}
      on={{
        click: () => {
          (thumbnailsRef.current?.visible
            ? thumbnailsRef.current?.hide
            : thumbnailsRef.current?.show)?.();
        },
      }}
    />
  );
};

export { LightBox, NextJsImage };
