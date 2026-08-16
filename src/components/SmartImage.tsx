'use client';

import React, { useState, useEffect } from 'react';

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcCandidate?: string | string[];
  fallbackPlaceholder?: string;
  onAllFailed?: () => void;
}

const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  srcCandidate,
  alt = '',
  fallbackPlaceholder = DEFAULT_PLACEHOLDER,
  style,
  className,
  onAllFailed,
  onError,
  ...props
}) => {
  // Parse candidate list
  const candidates: string[] = React.useMemo(() => {
    let list: string[] = [];
    if (Array.isArray(srcCandidate)) {
      list = srcCandidate;
    } else if (typeof srcCandidate === 'string' && srcCandidate.trim()) {
      list = srcCandidate.split(/,\s*/);
    } else if (typeof src === 'string' && src.trim()) {
      list = src.split(/,\s*/);
    }
    return list.map((u) => u.trim()).filter((u) => Boolean(u));
  }, [src, srcCandidate]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Reset when candidates change
  useEffect(() => {
    setCurrentIndex(0);
    setHasFailedAll(false);
  }, [candidates.join(',')]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentIndex + 1 < candidates.length) {
      // Try next candidate
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All candidates exhausted
      setHasFailedAll(true);
      if (onAllFailed) onAllFailed();
      if (onError) onError(e);
    }
  };

  const currentSrc = hasFailedAll || candidates.length === 0
    ? fallbackPlaceholder
    : candidates[currentIndex];

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={props.loading || 'lazy'}
      decoding="async"
      onError={handleError}
      className={className}
      style={style}
    />
  );
};
