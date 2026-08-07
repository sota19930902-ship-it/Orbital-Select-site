'use client';

import React from 'react';
import { ROOM_COORDINATIONS } from '../data/mockData';
import { Home, Layers } from 'lucide-react';

interface RoomCoordinationSectionProps {
  onSelectRoom: (roomType: string) => void;
}

export const RoomCoordinationSection: React.FC<RoomCoordinationSectionProps> = ({ onSelectRoom }) => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Living Orbits</span>
          <h2 className="section-title">部屋別ガイド ＆ コーディネート実例</h2>
          <p className="section-subtitle">
            リビング・ダイニング・寝室・書斎。ブランド家具を組み合わせた理想の部屋づくり実例。
          </p>
        </div>

        {/* Room Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
        }}>
          {ROOM_COORDINATIONS.map((coord) => (
            <div
              key={coord.id}
              onClick={() => onSelectRoom(coord.roomType)}
              className="img-zoom-container"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={coord.image}
                  alt={coord.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(11, 16, 32, 0.85)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-xs)',
                }}>
                  {coord.taste}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '6px' }}>
                  {coord.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {coord.subtitle}
                </p>

                {/* Used Brands Tag list */}
                <div style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--bg-sub)',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-gold)',
                  fontWeight: '600',
                }}>
                  <Layers size={14} />
                  使用ブランド: {coord.usedBrands.join(' / ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
