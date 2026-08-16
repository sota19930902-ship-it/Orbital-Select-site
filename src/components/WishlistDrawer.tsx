'use client';

import React from 'react';
import { Product } from '../types';
import { X, Trash2, Bookmark, Calculator } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onClearAll,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const totalBudget = wishlist.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        backgroundColor: 'rgba(11, 16, 32, 0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bookmark size={20} color="var(--accent-gold)" fill="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '500', color: 'var(--text-main)' }}>
              In Orbit ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-sub)',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Total Budget Estimator Card */}
        <div style={{
          padding: '20px 24px',
          backgroundColor: 'var(--bg-sub)',
          borderBottom: '1px solid var(--border-light)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '4px' }}>
            <Calculator size={16} /> 理想の部屋づくり・合計見積もり試算
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-main)' }}>
            ¥{totalBudget.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', fontWeight: '400' }}>(税込目安)</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            キープしたインテリアをまとめて揃えた場合の想定合計予算です。
          </p>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {wishlist.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--text-muted)',
            }}>
              <Bookmark size={48} color="var(--border-light)" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>In Orbit の商品はありません</p>
              <p style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-sub)' }}>
                気になる家具の「キープ」ボタンを押して、あなたのお部屋の軌道（Orbit）を探索してみましょう。
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>'}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';
                    }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: '600' }}>{item.brand}</span>
                    <h4
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: '500',
                        color: 'var(--text-main)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        onSelectProduct(item);
                        onClose();
                      }}
                    >
                      {item.name}
                    </h4>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                      ¥{item.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-muted)',
                      padding: '4px',
                      alignSelf: 'flex-start',
                    }}
                    title="削除"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {wishlist.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: '#FFFFFF',
          }}>
            <button
              onClick={onClearAll}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-light)',
                color: 'var(--text-sub)',
                fontSize: '0.85rem',
                fontWeight: '500',
              }}
            >
              リストをクリア
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
