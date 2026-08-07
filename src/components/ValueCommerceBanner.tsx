'use client';

import React, { useEffect, useRef } from 'react';

interface ValueCommerceBannerProps {
  sid: string;
  pid: string;
  maxHeight?: number;
}

export const ValueCommerceBanner: React.FC<ValueCommerceBannerProps> = ({
  sid,
  pid,
  maxHeight = 44,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.style.width = '130px';
    iframe.style.height = `${maxHeight + 8}px`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.backgroundColor = '#FFFFFF';
    iframe.style.borderRadius = '4px';
    iframe.style.flexShrink = '0';
    iframe.title = 'ValueCommerce Brand Banner';

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            img {
              max-height: ${maxHeight}px;
              max-width: 120px;
              object-fit: contain;
              border: 0;
              display: block;
            }
            a {
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}" target="_blank" rel="nofollow noopener">
            <img src="https://i.imgvc.com/vc/images/00/2b/34/56.jpeg" alt="ACTUS" onError="this.src='https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=${sid}&pid=${pid}'" />
          </a>
          <script language="javascript" src="https://ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=${sid}&pid=${pid}"></script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [sid, pid, maxHeight]);

  return <div ref={containerRef} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }} />;
};
