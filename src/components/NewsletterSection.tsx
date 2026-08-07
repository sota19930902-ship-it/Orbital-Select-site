'use client';

import React, { useState } from 'react';
import { Send, Check, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-main)',
      borderTop: '1px solid var(--border-light)',
    }} id="newsletter-section">
      <div className="container">
        <div style={{
          backgroundColor: 'var(--bg-space)',
          backgroundImage: 'radial-gradient(circle at 70% 30%, var(--bg-navy) 0%, var(--bg-space) 90%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--accent-gold-border)',
          padding: '56px',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle Background Orbital Ring Accent */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px solid rgba(197, 164, 109, 0.1)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '48px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <div>
              <span className="section-tag" style={{ color: 'var(--accent-gold)', justifyContent: 'flex-start' }}>
                Orbital Dispatch
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '400', color: '#FFFFFF', marginBottom: '12px', lineHeight: '1.3' }}>
                ニュースレター「Orbital Dispatch」に登録
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#CCCCCC', lineHeight: '1.8', fontWeight: '300' }}>
                月に数回、編集部がキュレーションした新作インテリア情報、ブランド比較特集、プライベート案内を静かにお届けします。
              </p>
            </div>

            <div>
              {isSubscribed ? (
                <div style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(197, 164, 109, 0.15)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.95rem',
                }}>
                  <Check size={20} color="var(--accent-gold)" />
                  <div>
                    <strong>登録完了</strong>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>最新の Orbital Dispatch をお届けします。</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="email"
                      placeholder="メールアドレスを入力..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        backgroundColor: 'var(--accent-gold)',
                        color: 'var(--bg-space)',
                        fontWeight: '600',
                        padding: '14px 28px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      登録する <Send size={15} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888888' }}>
                    ※ スパムメールは送信されません。いつでも解除可能です。
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
