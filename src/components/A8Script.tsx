'use client';

import Script from 'next/script';

export const A8Script = () => {
  return (
    <Script
      src="https://statics.a8.net/a8link/a8linkmgr.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && typeof (window as any).a8linkmgr === 'function') {
          (window as any).a8linkmgr({
            config_id: 'xuxzuGXh2ibMRHpHtnyH',
          });
        }
      }}
    />
  );
};
