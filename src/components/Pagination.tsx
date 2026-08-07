'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Page navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '48px',
        flexWrap: 'wrap',
      }}
    >
      {/* 前へボタン */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            padding: '8px 18px',
            backgroundColor: 'var(--accent-gold)',
            color: '#FFFFFF',
            border: '1px solid var(--accent-gold)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.92rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            height: '42px',
            boxShadow: 'var(--shadow-subtle)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-gold-hover)';
            e.currentTarget.style.borderColor = 'var(--btn-gold-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
          }}
        >
          前へ
        </button>
      )}

      {/* ページ番号ボタン */}
      {pages.map((p, idx) => {
        if (typeof p === 'string') {
          return (
            <span
              key={`dots-${idx}`}
              style={{
                padding: '0 6px',
                color: 'var(--text-muted)',
                fontSize: '1rem',
                userSelect: 'none',
              }}
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;

        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              minWidth: '42px',
              height: '42px',
              padding: '0 12px',
              backgroundColor: isCurrent ? 'var(--bg-space)' : '#FFFFFF',
              color: isCurrent ? '#FFFFFF' : 'var(--accent-gold)',
              border: isCurrent ? '1px solid var(--bg-space)' : '1px solid var(--accent-gold-border)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '1.05rem',
              fontWeight: isCurrent ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              boxShadow: isCurrent ? '0 2px 8px rgba(11,16,32,0.2)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isCurrent) {
                e.currentTarget.style.backgroundColor = 'var(--accent-gold-bg)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCurrent) {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--accent-gold-border)';
              }
            }}
          >
            {p}
          </button>
        );
      })}

      {/* 次へボタン */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            padding: '8px 18px',
            backgroundColor: 'var(--accent-gold)',
            color: '#FFFFFF',
            border: '1px solid var(--accent-gold)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.92rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            height: '42px',
            boxShadow: 'var(--shadow-subtle)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-gold-hover)';
            e.currentTarget.style.borderColor = 'var(--btn-gold-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
          }}
        >
          次へ
        </button>
      )}
    </nav>
  );
};
